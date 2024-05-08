import { BASE_URL, server } from '@/api/connection';
import { useGameStore } from '@/stores/game-store';

export enum SocketMessageType {
  PATCH = 'patch'
}

let socket: WebSocket | null = null;

export async function connectToGame() {
  if (socket) await disconnectFromGame();
  try {
    const response = await server.post(`/games/${useGameStore().id}/subscribe`);
    console.log(response);
  } catch (error: any) {
    console.error('Failed to subscribe to game:', error);
    return false;
  }

  const gameId = useGameStore().id;
  console.log('Connecting to game:', gameId);

  // Connect to the server's websocket server to receive game updates
  // User inputs will be sent to the server via REST API
  // The server will broadcast the game state to all clients connected to this game ID

  // Connect to the ws (3006)
  const url = BASE_URL.replace(/^https?:\/\//i, 'ws://') + ':3006';
  console.log('WS url:', url);

  try {
    socket = new WebSocket(url);
  } catch (error) {
    return false;
  }

  return new Promise((resolve) => {
    if (!socket) return resolve(false);
    socket.onopen = () => {
      socket!.onopen = onOpen;
      socket!.onclose = onClose;
      socket!.onmessage = onMessage;
      socket!.onerror = onError;
      onOpen();
      resolve(true);
    };

    socket.onerror = () => {
      resolve(false);
    };
  });
}

export async function disconnectFromGame() {
  if (!socket) return;
  if (socket.readyState === WebSocket.OPEN) socket.close();

  onClose();
  socket.onclose = null;
  socket.onmessage = null;
  socket.onerror = null;
  socket.onopen = null;

  socket = null;
}

function onMessage(event: any) {
  console.log('@game-controller: onMessage:', event.data);
}

function onOpen() {
  console.log('@game-controller: onOpen');
}

function onClose() {
  console.log('@game-controller: onClose');
  server.post(`/games/${useGameStore().id}/unsubscribe`);
}

function onError(error: any) {
  console.log('@game-controller: onError:', error);
}
