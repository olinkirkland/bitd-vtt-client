import { fetchUsers } from '@/api/account';
import InfoModal from '@/components/modals/modal-content/InfoModal.vue';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { connectToGame as connectToGame } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import { PageName, router } from '@/router';
import { Game } from '@/types/game';
import { ForeignUser } from '@/types/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const id = ref();

  const gameState = ref<(Game & { [key: string]: any }) | null>(null);

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
