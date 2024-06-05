<template>
  <div class="sheet-card" :style="{ backgroundColor: image?.commonColor }">
    <img :src="image?.url" />
    <div class="sheet-card__content">
      <h2>{{ props.sheet.name }}</h2>
      <div class="row info">
        <span class="tag">{{ templateType }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import sheetImages from '@/assets/data/sheet-images.json';
import { Character } from '@/game-data/sheets/character-sheet';
import { Crew } from '@/game-data/sheets/crew-sheet';
import { PropType, computed } from 'vue';
const props = defineProps({
  sheet: {
    type: Object as PropType<Crew | Character>,
    required: true
  }
});

const templateType = computed(() => {
  const sheetType = props.sheet.sheetType;
  if (sheetType === 'crew') return (props.sheet as Crew).crewType;
  else if (sheetType === 'character')
    return (props.sheet as Character).characterType;
});

const image = computed(() =>
  sheetImages.find((sheetImage) => sheetImage.id === props.sheet.image)
);
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
      gap: 0.4rem;
      .tag {
        white-space: nowrap;
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
