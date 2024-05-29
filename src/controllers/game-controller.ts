import { BASE_URL } from '@/api/connection';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { useGameStore } from '@/stores/game-store';
import { useTokenStore } from '@/stores/token-store';
import { Game } from '@/types/game';
import { Operation, applyPatch } from 'fast-json-patch';
import { Socket, io } from 'socket.io-client';
import ModalController from './modal-controller';

export enum SocketMessageType {
  PATCH = 'patch'
}

let socket: Socket | null = null;

export function connectToGame(gameId: string) {
  console.log('@game-controller: connectToGame');
  ModalController.open(LoadingModal);
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const socketOptions = {
    query: {
      gameId,
      token: useTokenStore().refreshToken
    }
  };

  socket = io(BASE_URL, socketOptions);
  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  socket.on('patch', onReceivePatch);
  socket.on('error', onError);

  ModalController.close();
}

export function disconnectFromGame() {
  if (socket) {
    socket.disconnect();
    socket = null;
    useGameStore().clear();
  }
}

function onReceivePatch(data: { patches: Operation[] }) {
  try {
    const { patches } = data;
    console.log('@game-controller: onReceivePatch:', patches);
    useGameStore().game = applyPatch(
      useGameStore().game || ({} as Game),
      patches
    ).newDocument;
  } catch (error) {
    console.error('Failed to patch:', error);
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
