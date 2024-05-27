<template>
  <ul class="player-bar">
    <li
      v-for="player in useGameStore().players"
      :key="player.id"
      :class="{
        'inactive-player': !(
          useGameStore().gameState?.connectedPlayerIds || []
        ).includes(player.id)
      }"
    >
      <Portrait :portraitId="player.portrait" />
      <Tooltip top :text="player.username" />
      <div
        class="online-indicator"
        :class="{
          'online-indicator--online': (
            useGameStore().gameState?.connectedPlayerIds || []
          ).includes(player.id)
        }"
      ></div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { disconnectSocket } from '@/controllers/game-controller';
import ModalController from '@/controllers/modal-controller';
import { PageName, router } from '@/router';
import { useGameStore } from '@/stores/game-store';
import Portrait from '../Portrait.vue';
import Tooltip from '../Tooltip.vue';
import GameOptions from '../modals/modal-content/GameOptions.vue';
import LoadingModal from '../modals/modal-content/LoadingModal.vue';

function onClickGameOptions() {
  ModalController.open(GameOptions);
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
</script>

<style lang="scss" scoped>
.player-bar {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  list-style: none;
  width: fit-content;

  li {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;

    &.inactive-player {
      > .portrait {
        opacity: 0.5;
      }
    }
  }
}

.online-indicator {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 1.6rem;
  height: 1.6rem;
  transform: translate(50%, 50%);
  border: 0.4rem solid var(--dark);
  border-radius: 50%;
  transition: background-color 0.2s;
  background-color: var(--dark-2);

  &--online {
    background-color: var(--green);
  }
}
</style>
