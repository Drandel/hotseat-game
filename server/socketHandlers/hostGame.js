const generateGameCode = () => {
  return Math.random().toString(36).slice(2, 6).toUpperCase();
};

export default (socket, io, lobbies) => {
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
};
