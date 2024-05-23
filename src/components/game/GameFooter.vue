<template>
  <div class="game-footer">
    <div class="block block--left">
      <button class="btn" @click="onClickDisconnect">
        <i class="fas fa-door-open"></i>
      </button>
      <button class="btn" @click="onClickGameOptions">
        <i class="fas fa-tasks"></i>
      </button>
    </div>
    <div class="block block--center">
      <button class="btn btn--alt">
        <i class="fas fa-file-alt"></i>
        <span>Scoundrels</span>
      </button>
      <button class="btn btn--alt">
        <i class="fas fa-file-alt"></i>
        <span>Crew</span>
      </button>
      <button class="btn btn--alt">
        <i class="fas fa-file-alt"></i>
        <span>World</span>
      </button>
    </div>
    <div class="block block--right">
      <ul class="player-list">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { disconnectSocket } from '@/controllers/game-socket-controller';
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
.game-footer {
  position: relative;
  height: 5.6rem;
  bottom: 0;
  width: 100%;

  > .block {
    position: absolute;
    height: 100%;
    padding: 1rem;
    display: flex;
    gap: 0.8rem;

    .player-list {
      display: flex;
      gap: 0.8rem;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;

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

    &--left {
      left: 0;
      background-color: var(--translucent-light);
    }

    &--right {
      right: 0;
    }

    &--center {
      background-color: var(--translucent-light);
      left: 50%;
      transform: translateX(-50%);
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
