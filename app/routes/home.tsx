import type { Route } from "./+types/home";
import { useState, useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Team Project Portfolio" },
    { name: "description", content: "Hardware projects and team portfolio." },
  ];
}

const DecryptText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const chars = "@#X%$&801!?";
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) return letter;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 9;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <>{displayText}</>;
};

const Bigfoot = ({ partyMode }: { partyMode: boolean }) => {
  const [status, setStatus] = useState<"hidden" | "peeking" | "dancing" | "running">("hidden");
  const [cooldown, setCooldown] = useState(false);
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // If we are already doing something or in cooldown, ignore
      if (partyMode || cooldown || status !== "hidden") return;
      
      const currentScroll = window.scrollY;
      const diff = Math.abs(currentScroll - lastScrollY.current);
      scrollAccumulator.current += diff;
      lastScrollY.current = currentScroll;

      // Higher frequency: appear every 250px of total scroll distance
      if (scrollAccumulator.current > 250) {
        scrollAccumulator.current = 0;
        setStatus("peeking");
        
        // Stay peeking for 2 seconds
        setTimeout(() => {
          if (!partyMode) {
            setStatus("running");
            // After running animation completes, hide
            setTimeout(() => {
              setStatus("hidden");
              setCooldown(true);
              // Small cooldown so he's not literally constant
              setTimeout(() => setCooldown(false), 2000);
            }, 600);
          }
        }, 2000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status, cooldown, partyMode]);

  useEffect(() => {
    if (partyMode) {
      setStatus("dancing");
    } else if (status === "dancing") {
      setStatus("running");
      setTimeout(() => setStatus("hidden"), 600);
    }
  }, [partyMode]);

  return (
    <div className={`bigfoot-container ${status}`}>
      <div className="bigfoot">
        <div className="sunglasses">
            <svg viewBox="0 0 100 25" fill="black">
                <rect x="10" y="5" width="35" height="15" />
                <rect x="55" y="5" width="35" height="15" />
                <rect x="45" y="10" width="10" height="5" />
            </svg>
        </div>
        <svg className="bigfoot-svg" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="16" y="12" width="32" height="38" fill="#4B2C20" />
          <rect x="20" y="8" width="24" height="6" fill="#4B2C20" />
          <rect x="12" y="20" width="4" height="22" fill="#4B2C20" />
          <rect x="48" y="20" width="4" height="22" fill="#4B2C20" />
          <rect x="24" y="18" width="4" height="4" fill="white" />
          <rect x="36" y="18" width="4" height="4" fill="white" />
          <rect x="25" y="19" width="2" height="2" fill="black" />
          <rect x="37" y="19" width="2" height="2" fill="black" />
          
          <g className="leg leg-left">
            <rect x="20" y="50" width="8" height="14" fill="#4B2C20" />
            <rect x="16" y="64" width="12" height="4" fill="#4B2C20" />
          </g>
          <g className="leg leg-right">
            <rect x="36" y="50" width="8" height="14" fill="#4B2C20" />
            <rect x="36" y="64" width="12" height="4" fill="#4B2C20" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default function Home() {
  const [theme, setTheme] = useState("dark-theme");
  const [partyMode, setPartyMode] = useState(false);
  
  const [guess, setGuess] = useState(0);
  const [gameMessage, setGameMessage] = useState("Guess the total cost of the Smart Jukebox parts!");
  const actualCost = 35;

  const handleGuess = () => {
    if (guess === actualCost) {
      setGameMessage("🎉 Spot on! It costs exactly €35.");
    } else if (guess < actualCost) {
      setGameMessage("Too low! Hardware isn't that cheap.");
    } else {
      setGameMessage("Too high! It's an Arduino, not a MacBook.");
    }
  };
  
  const [todos, setTodos] = useState([
    { id: 1, text: "Calculate 6 * 7 to find the meaning of life", completed: false },
    { id: 2, text: "Try dividing 1 by 0 (Warning: Void)", completed: false },
    { id: 3, text: "Calculate 80000 + 85 to regress to middle school", completed: false },
    { id: 4, text: "Calculate 9999999 + 1 to test the Arduino's RAM", completed: false },
    { id: 5, text: "Build an actual Smart Jukebox", completed: true }
  ]);
  const [newTodo, setNewTodo] = useState("");

  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcValue, setCalcValue] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  const [isScannerUnlocked, setIsScannerUnlocked] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    document.body.className = `${theme} ${partyMode ? "party-mode" : ""}`;
  }, [theme, partyMode]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark-theme" ? "light-theme" : "dark-theme");
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const inputDigit = (digit: string) => {
    const hasLetters = /[a-zA-Z]/.test(calcDisplay);
    let newValueStr = "";
    
    if (waitingForNewValue || hasLetters) {
      newValueStr = digit;
      setWaitingForNewValue(false);
    } else {
      newValueStr = calcDisplay === "0" ? digit : calcDisplay + digit;
    }

    if (newValueStr === "42") {
      setCalcDisplay("42 (The Answer 🌌)");
      setWaitingForNewValue(true);
      return;
    }
    if (newValueStr === "80085") {
      setCalcDisplay("80085 (Grow up. 🙄)");
      setWaitingForNewValue(true);
      return;
    }
    if (newValueStr === "69") {
      setCalcDisplay("69 (Nice. 👍)");
      setWaitingForNewValue(true);
      return;
    }

    setCalcDisplay(newValueStr);
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(calcDisplay);
    
    if (calcValue == null) {
      setCalcValue(inputValue);
    } else if (calcOp) {
      const currentValue = calcValue || 0;
      let newValue = currentValue;
      
      if (calcOp === "+") newValue = currentValue + inputValue;
      else if (calcOp === "-") newValue = currentValue - inputValue;
      else if (calcOp === "*") newValue = currentValue * inputValue;
      else if (calcOp === "/") {
        if (inputValue === 0) {
          setIsExploded(true);
          return;
        }
        newValue = currentValue / inputValue;
      }
      
      if (newValue > 9999999) {
        setCalcDisplay("Bro, chill. It's an Arduino.");
        setWaitingForNewValue(true);
        setCalcOp(null);
        setCalcValue(null);
        return;
      }

      setCalcValue(newValue);
      
      if (newValue === 42) {
        setCalcDisplay("42 (The Answer 🌌)");
      } else if (newValue === 80085) {
        setCalcDisplay("80085 (Grow up. 🙄)");
      } else if (newValue === 69) {
        setCalcDisplay("69 (Nice. 👍)");
      } else {
        setCalcDisplay(String(newValue));
      }
    }
    
    setWaitingForNewValue(true);
    setCalcOp(nextOp);
  };

  const clearCalc = () => {
    setCalcDisplay("0");
    setCalcValue(null);
    setCalcOp(null);
    setWaitingForNewValue(false);
  };

  const convertToBinary = () => {
    if (/[a-zA-Z]/.test(calcDisplay)) {
      setIsExploded(true);
      return;
    }
    const num = parseInt(calcDisplay, 10);
    if (!isNaN(num)) {
      setCalcDisplay(num.toString(2));
      setWaitingForNewValue(true);
    }
  };

  return (
    <>
      <Bigfoot partyMode={partyMode} />
      <nav>
        <h2 style={{ margin: 0 }}>Smart Jukebox Team</h2>
        <div className="nav-links" style={{ display: "flex", gap: "1rem" }}>
          <button className="theme-btn" onClick={() => setPartyMode(!partyMode)} style={{ background: partyMode ? "#ff00ff" : "var(--accent-1)" }}>
            {partyMode ? "STOP PANIC" : "PARTY MODE"}
          </button>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "dark-theme" ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </div>
      </nav>

      <main className="container">
        
        <section>
          <h2 className="project-header" style={{ marginTop: "2rem" }}>
            {partyMode ? "THE ROCKSTARS" : "The Team"}
          </h2>
          <div className="parts-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            
            <div className="part-card">
              <div className="avatar-box">
                <img src="/avatar_niklas_new.png" alt="Niklas Avatar" />
              </div>
              <h3 style={{ textAlign: "center" }}><DecryptText text="Niklas" /></h3>
              <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                <p><strong>About:</strong> Someone that thinks in systems and speaks in questions.</p>
                <p style={{ marginTop: "1rem" }}><strong>Hobbies:</strong> Friends 🍻, Tech 💻, AI 🤖</p>
              </div>
            </div>
            
            <div className="part-card">
              <div className="avatar-box">
                <img src="/avatar_liam.png" alt="Liam Avatar" />
              </div>
              <h3 style={{ textAlign: "center" }}><DecryptText text="Liam" /></h3>
              <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                <p><strong>About:</strong> Full-stack enthusiast who turns caffeine into clean code.</p>
                <p style={{ marginTop: "1rem" }}><strong>Hobbies:</strong> Programming 👨‍💻, Kitesurfing 🪁</p>
              </div>
            </div>
            
            <div className="part-card">
              <div className="avatar-box">
                <img src="/avatar_arda.png" alt="Arda Avatar" />
              </div>
              <h3 style={{ textAlign: "center" }}><DecryptText text="Arda" /></h3>
              <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                <p><strong>About:</strong> A generational coding talent fully dedicated to the craft.</p>
                <p style={{ marginTop: "1rem" }}><strong>Hobbies:</strong> Gaming 🎮</p>
              </div>
            </div>

          </div>
        </section>

        <section>
          <h2 className="project-header" style={{ marginTop: "6rem" }}>Project: Smart Jukebox</h2>
          <div className="video-wrapper">
            <video controls autoPlay loop muted>
              <source src="/jukebox_demo.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <h2 className="project-header" style={{ marginTop: "6rem" }}>Playground</h2>
        
        <div style={{ display: "flex", gap: "2rem", marginBottom: "4rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: "1rem" }}>Scan Authorization Card</h3>
            <div 
              draggable 
              className="rfid-card" 
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "rfid-card");
              }}
            >
              <span style={{ fontSize: "3rem" }}>🪪</span>
              <span>MASTER CARD</span>
            </div>
          </div>

          <div style={{ flex: 2 }}>
            <div 
              className={`rfid-scanner ${isDragOver ? "drag-over" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.getData("text/plain") === "rfid-card") {
                  setIsScannerUnlocked(true);
                }
              }}
            >
              {isScannerUnlocked ? <h3>ACCESS GRANTED</h3> : <h3>DROP CARD HERE</h3>}
            </div>
          </div>
        </div>

        {isScannerUnlocked && (
          <div className="interactive-grid">
              <div className="brutal-card">
                <h3 style={{ marginBottom: "1rem" }}>Tasks</h3>
                <form onSubmit={addTodo} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <input 
                    type="text" 
                    className="brutal-input" 
                    placeholder="What next?" 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                  <button type="submit" className="brutal-btn">Add</button>
                </form>
                {todos.map(todo => (
                  <div key={todo.id} className="todo-item">
                    <span>{todo.text}</span>
                    <button onClick={() => deleteTodo(todo.id)}>X</button>
                  </div>
                ))}
              </div>

              <div className="brutal-card">
                <h3 style={{ marginBottom: "1rem" }}>Arduino Calc</h3>
                <div className="calc-display">{calcDisplay}</div>
                <div className="calc-grid">
                  <button className="c-btn" onClick={() => inputDigit("1")}>1</button>
                  <button className="c-btn" onClick={() => inputDigit("2")}>2</button>
                  <button className="c-btn op" onClick={() => performOperation("+")}>+</button>
                  <button className="c-btn op" onClick={() => performOperation("=")}>=</button>
                </div>
              </div>
          </div>
        )}
      </main>
    </>
  );
}
