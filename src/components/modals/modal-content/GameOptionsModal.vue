<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Game Options</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="options">
        <section class="game-name">
          <div class="input-group">
            <label for="name">Game Name</label>
            <input
              type="text"
              :class="{
                disabled: useGameStore().userPlayer?.role !== PlayerRole.GM
              }"
              @change="onChangeGameName"
              placeholder="Enter a descriptive name"
              v-model="gameName"
            />
            <span class="reminder shake-once" v-if="nameError">
              {{ nameError }}
            </span>
          </div>
        </section>
        <section class="invite">
          <label>Invite Link</label>
          <div class="row invite-block">
            <div class="row">
              <p class="muted text-center">{{ inviteLink }}</p>
              <button
                class="btn btn--icon muted"
                @click="onClickCopyInviteLink"
              >
                <i class="fas fa-copy"></i>
              </button>
            </div>
            <button
              class="btn btn--icon muted"
              @click="onClickRegenerateInviteLink"
              v-if="useGameStore().userPlayer?.role === PlayerRole.GM"
            >
              <i class="fas fa-sync"></i>
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
import { patch } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useGameStore } from '@/stores/game-store';
import { PlayerRole } from '@/types/game';
import { makeGameInviteCode } from '@/util/names';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import ConfirmModal from './ConfirmModal.vue';
import LoadingModal from './LoadingModal.vue';

const nameError = ref<string | null>(null);
const gameName = ref(useGameStore().game?.name);

const inviteLink = computed(() => {
  return `${window.location.origin}/invite/${useGameStore().game?.inviteCode}`;
});

function onChangeGameName() {
  if (!gameName.value) {
    nameError.value = 'Name cannot be empty';
    return;
  }

  nameError.value = null;

  patch([
    {
      op: 'replace',
      path: '/name',
      value: gameName.value
    }
  ]);
}

function onClickCopyInviteLink() {
  navigator.clipboard.writeText(inviteLink.value);
}

function onClickRegenerateInviteLink() {
  patch([
    {
      op: 'replace',
      path: '/inviteCode',
      value: makeGameInviteCode()
    }
  ]);
}

function onClickAbandonGame() {
  ModalController.open(ConfirmModal, {
    title: 'Leave Game',
    message: 'Are you sure you want to leave the game?',
    confirmText: 'Leave Game',
    onConfirm: async () => {
      ModalController.open(LoadingModal);
      await leaveGame();
      router.push('/');
      ModalController.close();
    }
  });
}
</script>

<style scoped lang="scss">
.modal {
  width: 64rem;
}

.options {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  min-height: 100%;

  > section {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
}

.invite label {
  margin-bottom: 0.4rem;
}

.row.invite-block {
  max-width: 100%;

  > .row {
    flex: 1;
    overflow: hidden;
    background-color: var(--translucent-light);
    height: 4rem;
    padding-left: 1rem;
    border-radius: 5px;

    p {
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  * {
    color: var(--light);
  }
}
</style>
