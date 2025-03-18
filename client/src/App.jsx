import React, { useState } from "react";
import { useSocket } from "./hooks/useSocket";

function App() {
  const { gameCode, players, playerName, setPlayerName, hostGame, joinGame } =
    useSocket();
  const [view, setView] = useState("menu");
  const [inputCode, setInputCode] = useState("");
  return (
    <div>
      {view === "menu" && (
        <div>
          <h1>Hotseat Game</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button
            onClick={() => {
              hostGame(playerName);
              setView("lobby");
            }}
          >
            Host Game
          </button>
          <button onClick={() => setView("joining")}>Join Game</button>
        </div>
      )}

      {view === "joining" && (
        <div>
          <h1>Enter Game Code</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter game code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
          />
          <button
            onClick={() => {
              joinGame(inputCode);
              setView("lobby");
            }}
          >
            Join
          </button>
        </div>
      )}

      {view === "lobby" && (
        <div>
          <h1>Lobby Code: {gameCode}</h1>
          <span>Share this code with your friends!</span>
          <p>Players:</p>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

// ToDo
// disable host/join buttons until a name is entered
// disable join button until a valid game code is entered
// Make things look nicer (Mobile first)
// Split views out into separate components
// Add start game button and inGame scene
