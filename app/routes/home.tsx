import type { Route } from "./+types/home";
import { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Team Project Portfolio" },
    { name: "description", content: "Hardware projects and team portfolio." },
  ];
}

export default function Home() {
  const [theme, setTheme] = useState("dark-theme");
  
  // Guessing Game State
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
  
  // Todo List State
  const [todos, setTodos] = useState([
    { id: 1, text: "Build the Smart Jukebox", completed: true },
    { id: 2, text: "Write less generic copy", completed: true },
    { id: 3, text: "Fill in placeholder text", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState("0");
  const [calcValue, setCalcValue] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Theme Toggler
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark-theme" ? "light-theme" : "dark-theme");
  };

  // Todo Handlers
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

  // Calculator Handlers
  const inputDigit = (digit: string) => {
    if (waitingForNewValue) {
      setCalcDisplay(digit);
      setWaitingForNewValue(false);
    } else {
      setCalcDisplay(calcDisplay === "0" ? digit : calcDisplay + digit);
    }
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
      else if (calcOp === "/") newValue = currentValue / inputValue;
      
      setCalcValue(newValue);
      setCalcDisplay(String(newValue));
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

  const PlaceholderList = () => (
    <ul style={{ paddingLeft: "1.5rem", lineHeight: "1.6", marginTop: "1rem" }}>
      <li>You will use this page to show yourself!</li>
      <li>Names</li>
      <li>Pictures</li>
      <li>About me/us</li>
      <li>Hobbys</li>
      <li>Lists</li>
      <li>URLs</li>
      <li>Socials</li>
      <li>Emojis</li>
      <li>Be creative!</li>
    </ul>
  );

  return (
    <>
      <nav>
        <h2 style={{ margin: 0 }}>Smart Jukebox Team</h2>
        <div className="nav-links">
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "dark-theme" ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </div>
      </nav>

      <main className="container">
        
        <section>
          <h2 className="project-header" style={{ marginTop: "2rem" }}>The Team</h2>
          <div className="parts-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <div className="part-card">
              <div className="avatar-box" style={{ width: "120px", margin: "0 auto 1.5rem", boxShadow: "8px 8px 0px var(--accent-1)" }}>
                <img src="/avatar_niklas_new.png" alt="Niklas Avatar" />
              </div>
              <h3 style={{ textAlign: "center" }}>Niklas</h3>
              <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                <p><strong>About:</strong> Someone that thinks in systems and speaks in questions. Building, always curious with a quiet intensity that makes ordinary feel like it's hiding something worth discovering.</p>
                <p style={{ marginTop: "1rem" }}><strong>Hobbies:</strong> Friends 🍻, Tech 💻, AI 🤖, Skiing ⛷️</p>
                <p style={{ marginTop: "1rem" }}><strong>Social:</strong> <a href="https://www.linkedin.com/in/niklas-maximilian-milek-b2a277263/" target="_blank" rel="noreferrer" style={{color: "var(--accent-1)", fontWeight: "bold"}}>LinkedIn</a></p>
                <p style={{ marginTop: "1rem" }}><strong>Fun Fact:</strong> Likes to burn through tokens 🔥</p>
              </div>
            </div>
            <div className="part-card">
              <div className="avatar-box" style={{ width: "120px", margin: "0 auto 1.5rem", background: "var(--accent-2)", boxShadow: "8px 8px 0px var(--accent-1)" }}>
                <img src="/avatar_liam.png" alt="Liam Avatar" />
              </div>
              <h3 style={{ textAlign: "center" }}>Liam</h3>
              <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                <p><strong>About:</strong> Full-stack enthusiast who turns caffeine into clean code. Always looking for the next big wave.</p>
                <p style={{ marginTop: "1rem" }}><strong>Hobbies:</strong> Programming 👨‍💻, Kitesurfing 🪁, Volleyball 🏐</p>
                <p style={{ marginTop: "1rem" }}><strong>Social:</strong> <a href="https://www.linkedin.com/in/liam-bargmann-102147369/" target="_blank" rel="noreferrer" style={{color: "var(--accent-2)", fontWeight: "bold"}}>LinkedIn</a></p>
                <p style={{ marginTop: "1rem" }}><strong>Fun Fact:</strong> Can debug CSS without crying 🎯</p>
              </div>
            </div>
            <div className="part-card">
              <div className="avatar-box" style={{ width: "120px", margin: "0 auto 1.5rem", background: "var(--accent-3)", boxShadow: "8px 8px 0px var(--accent-1)" }}>
                <img src="/avatar_arda.png" alt="Arda Avatar" />
              </div>
              <h3 style={{ textAlign: "center" }}>Arda</h3>
              <div style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
                <p><strong>About:</strong> A generational coding talent fully dedicated to the craft, turning complex problems into elegant solutions with unwavering focus.</p>
                <p style={{ marginTop: "1rem" }}><strong>Hobbies:</strong> Gaming 🎮</p>
                <p style={{ marginTop: "1rem" }}><strong>Social:</strong> <a href="https://www.linkedin.com/in/arda-kulac-804a48331/" target="_blank" rel="noreferrer" style={{color: "var(--accent-3)", fontWeight: "bold"}}>LinkedIn</a> | <a href="#" target="_blank" rel="noreferrer" style={{color: "var(--accent-3)", fontWeight: "bold"}}>Instagram</a></p>
                <p style={{ marginTop: "1rem" }}><strong>Emojis:</strong> 🏀 😴 😡</p>
                <p style={{ marginTop: "1rem" }}><strong>Fun Fact:</strong> Learned coding when I was 7</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="project-header" style={{ marginTop: "6rem" }}>Project 01: Smart Jukebox</h2>
          <p style={{ marginBottom: "2rem", maxWidth: "700px" }}>
            RFID-triggered music & mood lighting. Tap a card — it recognises you, plays your song, and pulses the room in colour for every note. No apps, no screens. Just hardware.
          </p>

          <div className="video-wrapper">
            <video controls autoPlay loop muted>
              <source src="/jukebox_demo.mp4" type="video/mp4" />
            </video>
          </div>

          <h3 style={{ marginBottom: "1.5rem" }}>BOM (Bill of Materials)</h3>
          <div className="parts-grid">
            <div className="part-card">
              <img src="https://www.az-delivery.de/cdn/shop/products/mikrocontroller-board-lgt8f328p-mit-ch340-kompatibel-mit-arduino-ide-303972.jpg?v=1686855011&width=400" alt="Arduino UNO" style={{ width: "100%", border: "var(--border-width) solid var(--border-color)", marginBottom: "1rem", aspectRatio: "4/3", objectFit: "cover" }} />
              <h4>Arduino UNO</h4>
              <p>The brain. Runs the state machine, coordinates SPI for RFID, tone output, and PWM LEDs.</p>
            </div>
            <div className="part-card">
              <img src="https://www.az-delivery.de/cdn/shop/products/rfid-kit-rc522-mit-reader-chip-und-card-fur-raspberry-pi-und-co-1356mhz-593133.jpg?v=1679399176&width=400" alt="MFRC522 RFID" style={{ width: "100%", border: "var(--border-width) solid var(--border-color)", marginBottom: "1rem", aspectRatio: "4/3", objectFit: "cover" }} />
              <h4>MFRC522 RFID</h4>
              <p>Reads card UIDs at 13.56 MHz over SPI. Each UID maps to a song.</p>
            </div>
            <div className="part-card">
              <img src="https://www.az-delivery.de/cdn/shop/products/ky-023-joystick-modul-fur-uno-r3-501545.jpg?v=1679398844&width=400" alt="KY-023 Joystick" style={{ width: "100%", border: "var(--border-width) solid var(--border-color)", marginBottom: "1rem", aspectRatio: "4/3", objectFit: "cover" }} />
              <h4>KY-023 Joystick</h4>
              <p>Dual-axis analog input (X = tempo, Y = brightness) + pause button.</p>
            </div>
            <div className="part-card">
              <img src="https://www.az-delivery.de/cdn/shop/products/ky-006-passiver-piezo-buzzer-alarm-modul-932847.jpg?v=1679398800&width=400" alt="Piezo Buzzer" style={{ width: "100%", border: "var(--border-width) solid var(--border-color)", marginBottom: "1rem", aspectRatio: "4/3", objectFit: "cover" }} />
              <h4>Piezo Buzzer</h4>
              <p>Generates 8-bit melodies. Mario, Tetris, ABBA. You name it.</p>
            </div>
            <div className="part-card">
              <img src="https://www.az-delivery.de/cdn/shop/products/led-leuchtdioden-sortiment-kit-350-stuck-3mm-5mm-5-farben-864313.jpg?v=1679398918&width=400" alt="RGB LED" style={{ width: "100%", border: "var(--border-width) solid var(--border-color)", marginBottom: "1rem", aspectRatio: "4/3", objectFit: "cover" }} />
              <h4>RGB LED</h4>
              <p>PWM colour pulse for every note. Synchronised light show.</p>
            </div>
          </div>
        </section>

        <h2 className="project-header" style={{ marginTop: "6rem" }}>Playground</h2>
        
        <div className="brutal-card interactive" style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "1rem" }}>Guess the BOM Cost (€)</h3>
          <p style={{ marginBottom: "1rem", color: "var(--accent-1)", fontWeight: "bold" }}>{gameMessage}</p>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
            <button className="brutal-btn" onClick={() => setGuess(g => Math.max(0, g - 1))}>-</button>
            <span style={{ fontSize: "2.5rem", fontWeight: "bold", width: "80px" }}>€{guess}</span>
            <button className="brutal-btn" onClick={() => setGuess(g => g + 1)}>+</button>
          </div>
          <button className="brutal-btn" style={{ marginTop: "1.5rem" }} onClick={handleGuess}>Submit Guess</button>
        </div>

        <div className="interactive-grid">
          
          {/* TODO LIST */}
          <div className="brutal-card interactive">
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
            
            <div className="todo-list">
              {todos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'done' : ''}`}>
                  <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input 
                      type="checkbox" 
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    {todo.text}
                  </label>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "var(--accent-1)" }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* CALCULATOR */}
          <div className="brutal-card interactive">
            <h3 style={{ marginBottom: "1rem" }}>Calc</h3>
            <div className="calc-display">{calcDisplay}</div>
            
            <div className="calc-grid">
              <button className="c-btn" onClick={clearCalc}>C</button>
              <button className="c-btn op" onClick={() => performOperation("/")}>/</button>
              <button className="c-btn op" onClick={() => performOperation("*")}>*</button>
              <button className="c-btn op" onClick={() => performOperation("-")}>-</button>
              
              <button className="c-btn" onClick={() => inputDigit("7")}>7</button>
              <button className="c-btn" onClick={() => inputDigit("8")}>8</button>
              <button className="c-btn" onClick={() => inputDigit("9")}>9</button>
              <button className="c-btn op" onClick={() => performOperation("+")} style={{ gridRow: "span 2" }}>+</button>
              
              <button className="c-btn" onClick={() => inputDigit("4")}>4</button>
              <button className="c-btn" onClick={() => inputDigit("5")}>5</button>
              <button className="c-btn" onClick={() => inputDigit("6")}>6</button>
              
              <button className="c-btn" onClick={() => inputDigit("1")}>1</button>
              <button className="c-btn" onClick={() => inputDigit("2")}>2</button>
              <button className="c-btn" onClick={() => inputDigit("3")}>3</button>
              <button className="c-btn eq" onClick={() => performOperation("=")} style={{ gridRow: "span 2" }}>=</button>
              
              <button className="c-btn" onClick={() => inputDigit("0")} style={{ gridColumn: "span 2" }}>0</button>
              <button className="c-btn" onClick={() => inputDigit(".")}>.</button>
            </div>
          </div>

        </div>

      </main>
    </>
  );
}
