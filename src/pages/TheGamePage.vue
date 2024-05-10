<template>
  <div class="page">
    <h1>GAME PAGE</h1>

    <pre>Game ID: {{ gameId }}</pre>
    <pre>{{ useGameStore().gameState }}</pre>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game-store';
import { useRoute } from 'vue-router';
const route = useRoute();
const gameId = route.params.id as string;
useGameStore().setGameId(gameId);
</script>

<style scoped lang="scss">
pre {
  max-width: 64rem;
}
</style>
