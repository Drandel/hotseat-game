export default (socket, io, lobbies) => {
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
};
