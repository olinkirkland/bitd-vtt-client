<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Leave Game</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="guest-reminder">
        <p>
          Are you sure? This action will remove you from
          <em>{{ useGameStore().gameState?.name }}</em
          >. <br />You'll be able to rejoin using the invite link.
        </p>

        <div class="column center">
          <button class="btn" @click="ModalController.close()">
            <span>No, I changed my mind</span>
          </button>
          <button class="btn btn--text" @click="onClickLeaveGame">
            <span>Yes, remove me from this game</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { useGameStore } from '@/stores/game-store';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import { leaveGame } from '@/api/games';
import { PageName, router } from '@/router';
import LoadingModal from './LoadingModal.vue';
import { fetchMyAccount } from '@/api/account';

async function onClickLeaveGame() {
  ModalController.open(LoadingModal);
  await leaveGame();
  await fetchMyAccount();
  router.push({ name: PageName.GAMES });
  ModalController.close();
}
</script>

<style scoped lang="scss">
.guest-reminder {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
