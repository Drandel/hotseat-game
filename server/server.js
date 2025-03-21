import registerSocketHandlers from "./socketHandlers/index.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { questions } from "./data/index.js";
import cors from "cors";

const app = express();
app.use(cors());
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

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register event handlers
  registerSocketHandlers(socket, io, lobbies);
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/api/questions", (req, res) => {
  res.json(questions);
});
