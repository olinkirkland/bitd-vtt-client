<template>
  <div class="page">
    <h1>GAME PAGE</h1>

    <pre>Game ID: {{ gameId }}</pre>
    <pre>{{ game }}</pre>
  </div>
</template>

<script setup lang="ts">
import { connectToGame } from '@/controllers/game-socket-controller';
import { useGameStore } from '@/stores/game-store';
import { useRoute } from 'vue-router';
const route = useRoute();
const gameId = route.params.id as string;
useGameStore().setGameId(gameId);

const game: any = useGameStore().gameState || {};
</script>

<style scoped lang="scss">
pre {
  max-width: 64rem;
}
</style>
