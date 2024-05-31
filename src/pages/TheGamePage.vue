<template>
  <div class="page">
    <div class="game-layout">
      <div class="stage">
        <div class="row center">
          <button
            class="btn btn--tab"
            :class="{ active: currentTab === 'crew' }"
            @click="currentTab = 'crew'"
          >
            <span>Crew</span>
          </button>
          <button
            class="btn btn--tab"
            :class="{ active: currentTab === 'tasks' }"
            @click="currentTab = 'tasks'"
          >
            <span>Character</span>
          </button>
        </div>
      </div>
      <PlayerBar class="mobile-hidden" />
    </div>
  </div>

  <button class="btn btn--alt debug" @click="showModelOverlay = true">
    <i class="fas fa-cogs"></i> Debug
  </button>

  <div class="model-overlay" v-if="showModelOverlay">
    <pre>{{ JSON.stringify(useGameStore().game, null, 2) }}</pre>
    <button class="btn debug btn--alt" @click="showModelOverlay = false">
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import PlayerBar from '@/components/game/PlayerBar.vue';
import { connectToGame } from '@/controllers/game-controller';
import { useGameStore } from '@/stores/game-store';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const currentTab = ref('crew');

const showModelOverlay = ref(false);

onMounted(() => {
  const gameId = route.params.id as string;
  connectToGame(gameId);
});
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

button.debug {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}

.stage {
  flex: 1;
}
</style>
