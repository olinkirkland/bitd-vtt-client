<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Game Preview</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="game-preview">
        <div
          class="title-block"
          :style="{ backgroundColor: coverImage?.commonColor }"
        >
          <img class="game-preview__cover" :src="coverImage?.url" />
          <div class="overlay">
            <h1>{{ props.game.name }}</h1>
          </div>
        </div>
        <div class="row center game-join-bar">
          <span class="tag">{{ isGM ? 'GM' : 'Player' }}</span>
          <div class="row users">
            <i class="fas fa-users"></i>
            <span>{{ props.game.playerIds.length }}</span>
          </div>
          <button class="btn mobile-full-width" @click="onClickJoinGame">
            <span>Join Game</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <Divider />
        <h3>Players</h3>
        <div class="players-container">
          <div
            class="row center waiting-players"
            :class="{ collapsed: players.length > 0 }"
          >
            <i class="fas fa-circle-notch fa-spin"></i>
          </div>
          <ul class="players" :class="{ collapsed: players.length === 0 }">
            <li v-for="player in players" class="row" :key="player.id">
              <i class="fas fa-user-alt"></i>
              <span>{{ player.username }}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { fetchUsers } from '@/api/account';
import coverImages from '@/assets/data/cover-images.json';
import Divider from '@/components/Divider.vue';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useUserStore } from '@/stores/user-store';
import { Game } from '@/types/game';
import { ForeignUser } from '@/types/user';
import { computed, onMounted, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps<{
  game: Game;
}>();

const isGM = computed(() => props.game.ownerId === useUserStore().id);
const players = ref<ForeignUser[]>([]);

onMounted(async () => {
  players.value =
    (await fetchUsers(props.game.playerIds)) || ([] as ForeignUser[]);
});

const coverImage = computed(() => {
  return coverImages.find((image) => image.id === props.game.coverImage);
});

function onClickJoinGame() {
  router.push({ name: 'game', params: { id: props.game._id } });
  ModalController.close();
}
</script>

<style scoped lang="scss">
.modal {
  min-width: 64rem;
  max-width: 64rem;
}
:deep(.modal__header) {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.game-preview {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .title-block {
    position: relative;
    border: 1px solid var(--dark-2);
    line-height: 0;

    img.game-preview__cover {
      width: 100%;
      height: 16rem;
      object-fit: cover;
      object-position: 50% 50%;
    }

    > .overlay {
      position: absolute;
      line-height: normal;
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
      padding: 1.6rem;
      justify-content: center;
      align-items: center;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.35);
      h1 {
        text-align: center;
        width: 100%;
        color: var(--light);
        font-size: 2.8rem;
        text-shadow: 2px 2px 2px var(--dark);
      }
    }
  }

  .game-join-bar {
    > button {
      margin-left: 4rem;
    }
  }

  .players-container {
    position: relative;
    width: 100%;
    min-height: 4rem;

    ul.players {
      display: grid;
      overflow-y: auto;
      scrollbar-width: none;
      grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
      background-color: var(--translucent-light);
      padding: 0.4rem 1rem;
      max-height: 100rem;
      opacity: 1;
      transition-property: max-height, opacity;
      transition-duration: 2s;

      > li {
        padding: 1.2rem 0.8rem;
        gap: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;

        i {
          font-size: 1.2rem;
          opacity: 0.5;
        }

        > span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      &.collapsed {
        max-height: 0;
        opacity: 0;
      }
    }

    .waiting-players {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity 1s;

      &.collapsed {
        opacity: 0;
      }
    }
  }
}

@media (max-width: 768px) {
  .game-preview {
    ul.players > li:not(:last-child) {
      border-bottom: 1px solid var(--dark-2);
    }
  }
}
</style>
