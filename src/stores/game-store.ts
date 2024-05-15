import { fetchUsers } from '@/api/account';
import { connectSocketAndSubscribeToGame } from '@/controllers/game-socket-controller';
import { Game } from '@/types/game';
import { ForeignUser } from '@/types/user';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

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

  // Listen to changes in playerIds
  watch(gameState, (newValue, oldValue) => {
    if (newValue && newValue.playerIds !== oldValue?.playerIds)
      onPlayerIdsChange();
  });

  async function onPlayerIdsChange() {
    if (!gameState.value) return;
    players.value = await fetchUsers(gameState.value.playerIds);
  }

  return {
    id,
    gameState,
    players,
    clear,
    setGameId
  };
});
