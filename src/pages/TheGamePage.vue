<template>
  <div class="page">
    <div class="game-layout">
      <!-- <SideBar /> -->
      <button class="btn" @click="copyInviteLink(inviteLink)">
        <i class="fas fa-link"></i> Copy Invite Link
      </button>
      <pre>{{ useGameStore().game }}</pre>
      <PlayerBar class="mobile-hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerBar from '@/components/game/PlayerBar.vue';
import { connectToGame } from '@/controllers/game-controller';
import { useGameStore } from '@/stores/game-store';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

onMounted(() => {
  const gameId = route.params.id as string;
  connectToGame(gameId);
});

const inviteLink = computed(
  () => 'http://localhost:5173/invite/' + useGameStore().game?.inviteCode
);

function copyInviteLink(link: string) {
  navigator.clipboard.writeText(link);
}
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
