import { connectToGame } from '@/controllers/game-socket-controller';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const id = ref();
  const gameState = ref<any>();

  const clear = () => {
    id.value = null;
    gameState.value = null;
  };

  const setGameId = (gameId: string) => {
    clear();
    id.value = gameId;
    connectToGame();
  };
  return {
    id,
    gameState,
    clear,
    setGameId
  };
});
