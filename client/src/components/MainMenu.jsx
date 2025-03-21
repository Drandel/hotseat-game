import React from "react";

export default function MainMenu({
  setView,
  hostGame,
  playerName,
  setPlayerName,
}) {
  return (
    <>
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
      <button onClick={() => setView("joinGame")}>Join Game</button>
    </>
  );
}
