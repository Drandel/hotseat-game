const hostGame = require("./hostGame");
const joinGame = require("./joinGame");
const disconnect = require("./disconnect");

module.exports = (socket, io, lobbies) => {
  hostGame(socket, io, lobbies);
  joinGame(socket, io, lobbies);
  disconnect(socket, io, lobbies);
};
