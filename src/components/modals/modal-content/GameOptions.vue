<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Game Options</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="options">
        <section>
          <p>Invite Link</p>
          <div class="row invite-block">
            <p class="muted text-center">{{ inviteLink }}</p>
            <button class="btn btn--icon muted" @click="onClickCopyInviteLink">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </section>
        <Divider />
        <button class="btn btn--alt" @click="onClickAbandonGame">
          <span> Leave Game </span>
        </button>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { leaveGame } from '@/api/games';
import Divider from '@/components/Divider.vue';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useGameStore } from '@/stores/game-store';
import { computed } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import ConfirmModal from './ConfirmModal.vue';

const inviteLink = computed(() => {
  return `${window.location.origin}/invite/${
    useGameStore().gameState?.inviteCode
  }`;
});

function onClickCopyInviteLink() {
  navigator.clipboard.writeText(inviteLink.value);
}

function onClickAbandonGame() {
  ModalController.open(ConfirmModal, {
    title: 'Leave Game',
    message: 'Are you sure you want to leave the game?',
    confirmText: 'Leave Game',
    onConfirm: async () => {
      await leaveGame();
      router.push('/games');
      ModalController.close();
    }
  });
}
</script>

<style scoped lang="scss">
.options {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.invite-block,
.invite-block * {
  color: var(--light);
}
</style>
