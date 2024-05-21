<template>
  <div v-if="!useGameStore().gameState" class="page">
    <h1>Loading...</h1>
  </div>
  <div class="page" v-else>
    <h1>GAME PAGE</h1>

    <pre>Game ID: {{ gameId }}</pre>
    <pre>{{ game }}</pre>
    <div class="row">
      <button class="btn" @click="onClickDisconnect">Disconnect</button>
      <button class="btn btn--alt" @click="onClickLeave">
        <i class="fas fa-skull-crossbones"></i>
        Abandon Game
      </button>
    </div>
    <Panel class="invite-block">
      <div class="row center">
        <p class="muted text-center">{{ inviteLink }}</p>
        <button class="btn icon muted" @click="onClickCopyInviteLink">
          <i class="fas fa-copy"></i>
        </button>
      </div>
    </Panel>
    <p>Players</p>
    <ul>
      <li v-for="player in useGameStore().players" :key="player.id">
        <i class="fas fa-user-alt"></i>
        {{ player.username }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Panel from '@/components/modals/Panel.vue';
import ConfirmLeaveGameModal from '@/components/modals/modal-content/ConfirmLeaveGameModal.vue';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { disconnectSocket } from '@/controllers/game-socket-controller';
import ModalController from '@/controllers/modal-controller';
import { PageName, router } from '@/router';
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

async function onClickDisconnect() {
  ModalController.open(LoadingModal);
  try {
    await disconnectSocket();
  } catch (error) {
    console.error(error);
  }
  useGameStore().clear();
  router.push({ name: PageName.GAMES });
  ModalController.close();
}

function onClickLeave() {
  ModalController.open(ConfirmLeaveGameModal);
}

const game = computed(() => useGameStore().gameState);
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
