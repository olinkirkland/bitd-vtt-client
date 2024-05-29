<template>
  <div class="page">
    <div class="game-layout">
      <div class="row center">
        <button class="btn" @click="copyInviteLink(inviteLink)">
          <i class="fas fa-link"></i> Copy Invite Link
        </button>

        <button class="btn" @click="showModelOverlay = true">
          <i class="fas fa-cogs"></i> Debug
        </button>

        <button class="btn" @click="leaveGame">
          <i class="fas fa-sign-out-alt"></i> Leave Game
        </button>
      </div>

      <PlayerBar class="mobile-hidden" />
    </div>
  </div>

  <div class="model-overlay center" v-if="showModelOverlay">
    <pre>{{ JSON.stringify(useGameStore().game, null, 2) }}</pre>
    <button class="btn btn--alt" @click="showModelOverlay = false">
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import { leaveGame } from '@/api/games';
import PlayerBar from '@/components/game/PlayerBar.vue';
import { connectToGame } from '@/controllers/game-controller';
import { useGameStore } from '@/stores/game-store';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const showModelOverlay = ref(false);

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

.model-overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  background-color: var(--translucent-heavy);
  backdrop-filter: blur(0.4rem);

  > pre {
    background: none;
    flex: 1;
    overflow: auto;
  }
}
</style>
