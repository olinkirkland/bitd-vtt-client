<template>
  <div class="page">
    <div class="row">
      <SideBar />
      <pre>{{ game }}</pre>
    </div>
    <PlayerBar class="mobile-hidden" />
  </div>
</template>

<script setup lang="ts">
import PlayerBar from '@/components/game/PlayerBar.vue';
import SideBar from '@/components/game/SideBar.vue';
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
.pre {
  max-width: 64rem;
}

.page > .row {
  height: 100%;
}
</style>
