import { BASE_URL } from '@/api/connection';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { useGameStore } from '@/stores/game-store';
import { useTokenStore } from '@/stores/token-store';
import { Operation, applyPatch } from 'fast-json-patch';
import ModalController from './modal-controller';

export enum SocketMessageType {
  PATCH = 'patch'
}

let socket: WebSocket | null = null;

export async function connectToGame() {
  console.log('@game-controller: connectToGame');
  ModalController.open(LoadingModal);
  await disconnectSocket();

  // Use ws on dev and wss on production
  const url =
    BASE_URL.replace(
      /^https?/,
      location.hostname === 'localhost' ? 'ws' : 'wss'
    ) + `?gameId=${useGameStore().id}&token=${useTokenStore().accessToken}`;

  try {
    socket = new WebSocket(url);
  } catch (error) {
    console.error('Failed to create WebSocket:', error);
    return false;
  }

  ModalController.close();
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

  if (data.type !== SocketMessageType.PATCH)
    return console.error('Invalid message type:', data.type);

  try {
    const { patches } = data as { patches: Operation[] };

    useGameStore().gameState = applyPatch(
      useGameStore().gameState,
      patches
    ).newDocument;
  } catch (error) {
    console.error('Failed to parse message:', error);
    return;
  }
}

function onOpen() {
  console.log('@game-controller: onOpen');
}

function onClose() {
  console.log('@game-controller: onClose');
}

function onError(error: any) {
  console.log('@game-controller: onError:', error);
}
