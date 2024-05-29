import { BASE_URL } from '@/api/connection';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { useGameStore } from '@/stores/game-store';
import { useTokenStore } from '@/stores/token-store';
import { Operation, applyPatch } from 'fast-json-patch';
import { Socket, io } from 'socket.io-client';
import ModalController from './modal-controller';

export enum SocketMessageType {
  PATCH = 'patch'
}

let socket: Socket | null = null;

export function connectToGame() {
  console.log('@game-controller: connectToGame');
  ModalController.open(LoadingModal);
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const socketOptions = {
    query: {
      gameId: useGameStore().id,
      token: useTokenStore().accessToken
    }
  };

  socket = io(BASE_URL, socketOptions);
  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  socket.on('message', onMessage);
  socket.on('error', onError);

  ModalController.close();
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

function onConnect() {
  console.log('@game-controller: onOpen');
}

function onDisconnect() {
  console.log('@game-controller: onClose');
}

function onError(error: any) {
  console.log('@game-controller: onError:', error);
}
