import React, { useState } from "react";
import { useSocket } from "./hooks/useSocket";
import MainMenu from "./components/MainMenu";

function App() {
  const { gameCode, players, playerName, setPlayerName, hostGame, joinGame } =
    useSocket();
  const [view, setView] = useState("menu");
  const [inputCode, setInputCode] = useState("");

  if (view === "menu") {
    return (
      <MainMenu
        setView={setView}
        hostGame={hostGame}
        playerName={playerName}
        setPlayerName={setPlayerName}
      />
    );
  }

  if (view === "joinGame") {
    return (
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
    );
  }

  if (view === "lobby") {
    return (
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
    );
  }
}

export default App;

// ToDo
// disable host/join buttons until a name is entered
// disable join button until a valid game code is entered
// Split views out into separate components
// Make things look nicer (Mobile first)
// Add start game button to lobby
// Add InGame component and start on game logic
