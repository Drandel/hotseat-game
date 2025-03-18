const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://10.0.0.253:5173"], // Adjust to match frontend IP
    methods: ["GET", "POST"],
  },
});

// Store active lobbies
const lobbies = {}; // { "ABCD": { host: socket.id, players: [{ id, name }] } }

// Function to generate a 4-letter game code
const generateGameCode = () => {
  return Math.random().toString(36).substr(2, 4).toUpperCase();
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Create a new game lobby
  socket.on("hostGame", (playerName) => {
    let gameCode;
    do {
      gameCode = generateGameCode();
    } while (lobbies[gameCode]); // Ensure unique code

    // Create a new lobby
    lobbies[gameCode] = {
      host: socket.id,
      players: [{ id: socket.id, name: playerName || "Host" }],
    };

    socket.join(gameCode);
    socket.emit("gameCreated", gameCode);

    io.to(gameCode).emit("playerJoined", {
      players: lobbies[gameCode].players,
    });

    console.log(`Lobby created: ${gameCode} by ${playerName || "Host"}`);
  });

  // Join an existing lobby
  socket.on("joinGame", ({ gameCode, playerName }) => {
    if (lobbies[gameCode]) {
      // Add player with name
      lobbies[gameCode].players.push({ id: socket.id, name: playerName });
      socket.join(gameCode);

      // Notify all players in the lobby with updated names
      io.to(gameCode).emit("playerJoined", {
        players: lobbies[gameCode].players,
        gameCode: gameCode,
      });

      console.log(`User ${playerName} (${socket.id}) joined game ${gameCode}`);
    } else {
      socket.emit("error", "Invalid game code");
    }
  });

  // Handle disconnects
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    for (let code in lobbies) {
      const lobby = lobbies[code];
      if (lobby.players.some((p) => p.id === socket.id)) {
        // Remove player from lobby
        lobby.players = lobby.players.filter((p) => p.id !== socket.id);

        // If the host left, assign a new host or delete the lobby
        if (lobby.host === socket.id) {
          if (lobby.players.length > 0) {
            lobby.host = lobby.players[0].id; // Assign new host
            io.to(code).emit("newHost", lobby.players[0].name);
            console.log(`New host for ${code} is ${lobby.players[0].name}`);
          } else {
            delete lobbies[code]; // No players left, delete lobby
            console.log(`Lobby ${code} closed`);
          }
        }

        // Notify players of updated lobby
        io.to(code).emit("playerLeft", {
          players: lobby.players,
        });

        break; // Stop checking once we find the player's lobby
      }
    }
  });
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
