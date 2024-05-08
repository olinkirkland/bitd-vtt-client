<template>
  <footer>
    <div class="game-block row center" v-if="game.id && notOnGamePage">
      <button class="btn" @click="onClickGoToGame">
        <span>
          {{ game.id }}
        </span>
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
    <div class="row center">
      <span> &copy; {{ currentYear }} </span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { router } from '@/router';
import { useGameStore } from '@/stores/game-store';
import { computed } from 'vue';

const currentYear = new Date().getFullYear();
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
