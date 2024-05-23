<template>
  <div v-if="!useGameStore().gameState" class="page">
    <h1>Loading...</h1>
  </div>
  <div class="page" v-else>
    <div class="game">
      <pre>Game ID: {{ gameId }}</pre>
      <pre>{{ game }}</pre>
      <p>Players</p>
      <ul>
        <li v-for="player in useGameStore().players" :key="player.id">
          <i class="fas fa-user-alt"></i>
          {{ player.username }}
        </li>
      </ul>
    </div>
    <GameFooter />
  </div>
</template>

<script setup lang="ts">
import GameFooter from '@/components/game/GameFooter.vue';
import Panel from '@/components/modals/Panel.vue';
import { useGameStore } from '@/stores/game-store';
import { useUserStore } from '@/stores/user-store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const gameId = route.params.id as string;
if (useGameStore().id !== gameId) useGameStore().setGameId(gameId);

const state = useGameStore().gameState;
const isGM = computed(() => state?.ownerId === useUserStore().id);

const game = computed(() => useGameStore().gameState);
</script>

<style scoped lang="scss">
.game {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

pre {
  max-width: 64rem;
}
</style>
