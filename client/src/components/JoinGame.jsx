import React from "react";

export default function JoinGame({
  setView,
  joinGame,
  playerName,
  setPlayerName,
  inputCode,
  setInputCode,
}) {
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
