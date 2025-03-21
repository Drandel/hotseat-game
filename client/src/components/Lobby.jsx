import React from "react";

export default function Lobby({ gameCode, players }) {
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
