import { connectToGame } from '@/controllers/game-controller';
import { Game } from '@/types/game';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const game = ref<Game | null>(null);

  const clear = () => {
    game.value = null;
  };

  return {
    game,
    clear
  };
});
