import { BASE_URL, server } from '@/api/connection';
import { useGameStore } from '@/stores/game-store';
import { useTokenStore } from '@/stores/token-store';
import { Operation, applyPatch } from 'fast-json-patch';

export enum SocketMessageType {
  PATCH = 'patch'
}

let socket: WebSocket | null = null;

export async function connectSocketAndSubscribeToGame() {
  if (socket) await disconnectSocket();

  try {
    const response = await server.post(`/game/${useGameStore().id}/subscribe`);
    const { data } = response;
    useGameStore().gameState = data;
  } catch (error: any) {
    console.error('Failed to subscribe to game:', error);
    return false;
  }

  // Connect to the server's websocket server to receive game updates
  // User inputs will be sent to the server via REST API
  // The server will broadcast the game state to all clients connected to this game ID
  // Replace the port with 3006
  const url = BASE_URL.replace(/^https?/, 'ws').replace(/:\d+$/, ':3006');

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

export async function disconnectSocket() {
  if (!socket) return;
  if (socket.readyState === WebSocket.OPEN) socket.close();

  onClose();
  socket.onclose = null;
  socket.onmessage = null;
  socket.onerror = null;
  socket.onopen = null;

  socket = null;
}

function onMessage(message: any) {
  console.log('@game-controller: onMessage:', message.data);
  if (!message.data) return;

  const data = JSON.parse(message.data);

  if (data.type !== 'patch')
    return console.error('Invalid message type:', data.type);

  try {
    const socketMessage = data as {
      type: 'patch';
      patches: Operation[];
    };
    useGameStore().gameState = applyPatch(
      useGameStore().gameState,
      socketMessage.patches
    ).newDocument;
  } catch (error) {
    console.error('Failed to parse message:', error);
    return;
  }
}

function onOpen() {
  console.log('@game-controller: onOpen');
  const token = useTokenStore().accessToken;
  if (!token) return;
  socket!.send(token);
}

function onClose() {
  console.log('@game-controller: onClose');
  server.post(`/game/${useGameStore().id}/unsubscribe`);
}

function onError(error: any) {
  console.log('@game-controller: onError:', error);
}
