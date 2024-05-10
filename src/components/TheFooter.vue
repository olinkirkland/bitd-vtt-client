<template>
  <footer v-if="game.id && notOnGamePage">
    <div class="game-block row center">
      <button class="btn mobile-full-width" @click="onClickGoToGame">
        <span> Return to {{ game.gameState.name }} </span>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { router } from '@/router';
import { useGameStore } from '@/stores/game-store';
import { computed } from 'vue';

const game = useGameStore();
const notOnGamePage = computed(() => router.currentRoute.value.name !== 'game');

function onClickGoToGame() {
  router.push({ name: 'game', params: { id: game.id } });
}
</script>

<style scoped lang="scss">
footer {
  position: relative;
  background-color: var(--dark);
  color: var(--light);
  padding: 1rem;
  text-align: center;
  border-top: 1px solid var(--dark-2);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-block {
  flex-direction: column;
}
</style>
