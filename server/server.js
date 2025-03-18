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

// Import socket handlers
const registerSocketHandlers = require("./socketHandlers");

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register event handlers
  registerSocketHandlers(socket, io, lobbies);
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
