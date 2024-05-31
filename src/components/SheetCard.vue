<template>
  <div class="sheet-card" :style="{ backgroundColor: coverImage?.commonColor }">
    <img :src="coverImage?.url" />
    <div class="sheet-card__content">
      <h2>{{ props.sheet.book.name }}</h2>
      <div class="row info">
        <span class="tag">
          {{ useGameStore().game?.players[props.sheet.createdBy]?.username }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import coverImages from '@/assets/data/cover-images.json';
import { Character } from '@/game-data/sheets/character-sheet';
import { Crew } from '@/game-data/sheets/crew-sheet';
import { useGameStore } from '@/stores/game-store';
import { PropType, computed } from 'vue';
const props = defineProps({
  sheet: {
    type: Object as PropType<Crew | Character>,
    required: true
  }
});

const coverImage = computed(() => {
  // return coverImages.find((image) => image.id === props.game.coverImage);
  return coverImages[0];
});
</script>

<style lang="scss" scoped>
.sheet-card {
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

  > .sheet-card__content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
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
