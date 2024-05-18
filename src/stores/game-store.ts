import { fetchUsers } from '@/api/account';
import InfoModal from '@/components/modals/modal-content/InfoModal.vue';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { connectSocketAndSubscribeToGame } from '@/controllers/game-socket-controller';
import ModalController from '@/controllers/modal-controller';
import { PageName, router } from '@/router';
import { Game } from '@/types/game';
import { ForeignUser } from '@/types/user';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const id = ref();

  // gameState contains at least Game
  const gameState = ref<(Game & { [key: string]: any }) | null>(null);

  const clear = () => {
    id.value = null;
    gameState.value = null;
  };

  const setGameId = (gameId: string) => {
    clear();
    id.value = gameId;
    connectSocketAndSubscribeToGame();
  };

  const players = ref<ForeignUser[]>([]);
  async function validatePlayers() {
    if (!gameState.value) return;
    players.value = await fetchUsers(gameState.value.playerIds);
  }

  return {
    id,
    gameState,
    players,
    validatePlayers,
    clear,
    setGameId
  };
});
