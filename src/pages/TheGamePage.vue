<template>
  <div v-if="!useGameStore().gameState" class="page">
    <h1>Loading...</h1>
  </div>
  <div class="page">
    <h1>GAME PAGE</h1>

    <pre>Game ID: {{ gameId }}</pre>
    <pre>{{ useGameStore().gameState }}</pre>
    <Panel class="invite-block">
      <div class="row center">
        <p class="muted text-center">{{ inviteLink }}</p>
        <button class="btn icon muted" @click="onClickCopyInviteLink">
          <i class="fas fa-copy"></i>
        </button>
      </div>
    </Panel>
  </div>
</template>

<script setup lang="ts">
import Panel from '@/components/modals/Panel.vue';
import { useGameStore } from '@/stores/game-store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const gameId = route.params.id as string;
if (useGameStore().id !== gameId) useGameStore().setGameId(gameId);

const inviteLink = computed(() => {
  return `${window.location.origin}/invite/${
    useGameStore().gameState?.inviteCode
  }`;
});

function onClickCopyInviteLink() {
  navigator.clipboard.writeText(inviteLink.value);
}
</script>

<style scoped lang="scss">
pre {
  max-width: 64rem;
}

.invite-block,
.invite-block button.icon {
  color: var(--light);
}
</style>
