<template>
  <div class="game-card" :style="{ backgroundColor: coverImage?.commonColor }">
    <img :src="coverImage?.url" />
    <div class="game-card__content">
      <h2>{{ props.game.name }}</h2>
      <div class="row info">
        <span v-if="isGM" class="tag gm">GM</span>
        <span v-else class="tag player">
          <i class="fas fa-user-alt"></i>
          <span>Player</span>
        </span>
        <div class="row users">
          <i class="fas fa-users"></i>
          <span>{{ props.game.players.length }}</span>
        </div>
        <p class="date-created">{{ dateCreatedText }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import coverImages from '@/assets/data/cover-images.json';
import { Game } from '@/types/game';
import { useUserStore } from '@/stores/user-store';
import { PropType, computed } from 'vue';
const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    required: true
  }
});

const coverImage = computed(() => {
  return coverImages.find((image) => image.id === props.game.coverImage);
});

const isGM = computed(() => props.game.owner === useUserStore().id);

const dateCreatedText = computed(() => {
  const date = new Date(props.game.createdAt);
  return date.toLocaleDateString();
});
</script>

<style lang="scss" scoped>
.game-card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  height: 16rem;
  overflow: hidden;
  box-shadow: var(--shadow);

  > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  > .game-card__content {
    z-index: 1;
    margin-top: auto;
    width: 100%;
    background-color: var(--translucent-heavy);
    padding: 1rem;
    color: var(--light);

    > .info {
      gap: 2rem;
      .tag {
        white-space: nowrap;
        margin-right: auto;
      }
      p.date-created {
        letter-spacing: 1.5px;
        text-transform: uppercase;
        font-size: 1.2rem;
        opacity: 0.5;
      }
    }
  }
}
</style>