import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const socket = io("http://10.0.0.253:8080"); // Adjust to match your backend server IP

export const useSocket = () => {
  const [gameCode, setGameCode] = useState("");
  const [players, setPlayers] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    // Listen for game creation
    socket.on("gameCreated", (code) => {
      setGameCode(code);
      setIsHost(true);

      // 🔥 Ensure the host's name is displayed immediately!
      setPlayers([{ name: playerName }]);
    });

    // Update players when someone joins
    socket.on("playerJoined", (data) => {
      setPlayers(data.players);
    });

    // Handle errors (invalid game codes, etc.)
    socket.on("error", (message) => {
      alert(message);
    });

    // Handle lobby closure when host disconnects
    socket.on("lobbyClosed", () => {
      alert("The host has left. Lobby closed.");
      setGameCode("");
      setPlayers([]);
      setIsHost(false);
    });

    // Handle player leaving
    socket.on("playerLeft", (data) => {
      setPlayers(data.players);
    });

    // Handle host reassignment if host leaves
    socket.on("newHost", (newHostName) => {
      alert(`The new host is ${newHostName}`);
      setIsHost(newHostName === playerName);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("playerJoined");
      socket.off("error");
      socket.off("lobbyClosed");
      socket.off("playerLeft");
      socket.off("newHost");
    };
  }, [playerName]);

  // Host a new game and send player name
  const hostGame = useCallback(() => {
    if (!playerName.trim()) {
      alert("Please enter your name before hosting.");
      return;
    }
    socket.emit("hostGame", playerName);
  }, [playerName]);

  // Join an existing game with player name
  const joinGame = useCallback(
    (code) => {
      if (!playerName.trim()) {
        alert("Please enter your name before joining.");
        return;
      }
      socket.emit("joinGame", { gameCode: code, playerName });
      setGameCode(code);
    },
    [playerName]
  );

  return {
    socket,
    gameCode,
    players,
    playerName,
    setPlayerName,
    hostGame,
    joinGame,
    isHost,
  };
};
