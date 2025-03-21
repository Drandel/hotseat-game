[comment]: # "To open preview in VS Code press `ctrl+shift+v`"

# useSocket Hook Documentation

## Overview

The `useSocket` hook manages real-time multiplayer game connections using Socket.IO. It handles player connections, game creation, joining games, and various game events.

## How It Works

### Imports and Setup

```javascript
import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const socket = io("http://10.0.0.253:8080"); // Connects to your game server
```

### State Variables

The hook maintains several pieces of information about the game:

- `gameCode`: The unique identifier for a game room
- `players`: List of all players in the current game
- `playerName`: The current user's name
- `isHost`: Whether the current player is hosting the game

### Socket Event Listeners

When the component using this hook mounts, it sets up listeners for various game events:

1. **gameCreated**: When a new game is created, updates the game code and makes player the host
2. **playerJoined**: Updates the players list when someone new joins
3. **error**: Displays error messages from the server
4. **lobbyClosed**: Handles what happens when a game lobby is closed
5. **playerLeft**: Updates the players list when someone leaves
6. **newHost**: Handles reassignment of host if the original host leaves

### Game Actions

The hook provides functions to interact with the game:

1. **hostGame**: Creates a new game and makes the current player the host
2. **joinGame**: Joins an existing game using a game code

### Return Values

The hook returns all the necessary state and functions needed by your game components:

```javascript
return {
  socket, // Direct access to socket for custom events
  gameCode, // Current game's code
  players, // Array of players in the game
  playerName, // Current player's name
  setPlayerName, // Function to update player's name
  hostGame, // Function to create and host a new game
  joinGame, // Function to join an existing game
  isHost, // Boolean indicating if current player is the host
};
```

## Usage Example

```jsx
function GameLobby() {
  const { playerName, setPlayerName, gameCode, players, hostGame, joinGame } =
    useSocket();

  // Now you can use these values and functions in your component
  return (
    <div>
      <input
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={hostGame}>Host Game</button>

      {/* More UI elements */}
    </div>
  );
}
```
