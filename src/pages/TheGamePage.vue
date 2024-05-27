<template>
  <div class="page">
    <div class="game-layout">
      <!-- <SideBar /> -->
      <pre>{{ game }}</pre>
      <PlayerBar class="mobile-hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerBar from '@/components/game/PlayerBar.vue';
import { useGameStore } from '@/stores/game-store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const gameId = route.params.id as string;

if (useGameStore().id !== gameId) useGameStore().setGameId(gameId);

const state = useGameStore().gameState;

const game = computed(() => useGameStore().gameState);
</script>

<style scoped lang="scss">
pre {
  margin: 2rem;
  width: auto;
  flex: 1;
}

.game-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > .player-bar {
    margin: 0 auto 2rem auto;
  }
}
</style>
