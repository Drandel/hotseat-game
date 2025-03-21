import hostGame from "./hostGame.js";
import joinGame from "./joinGame.js";
import disconnect from "./disconnect.js";

export default (socket, io, lobbies) => {
  hostGame(socket, io, lobbies);
  joinGame(socket, io, lobbies);
  disconnect(socket, io, lobbies);
};
