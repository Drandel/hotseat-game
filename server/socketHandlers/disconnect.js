export default (socket, io, lobbies) => {
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
};
