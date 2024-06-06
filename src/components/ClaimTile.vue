<template>
  <div
    class="claim-tile"
    :class="{ active: props.claim.quantity > 0 }"
    @click="props.change(!props.claim.quantity ? 1 : 0)"
  >
    <div class="header" :class="{ 'no-description': !props.claim.description }">
      <h2>{{ props.claim.name }}</h2>
    </div>
    <p v-if="props.claim.description">{{ props.claim.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { Claim } from '@/game-data/sheets/crew-sheet';
import { defineProps } from 'vue';

const props = defineProps<{
  claim: Claim;
  idPrefix: string;
  propertyName: string;
  change: (quantity: number) => void;
}>();
</script>

<style lang="scss" scoped>
.claim-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  gap: 0.4rem;
  background-color: var(--translucent-light);
  padding: 1.2rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;
  cursor: pointer;

  .header {
    display: flex;
    gap: 0.4rem;

    &.no-description {
      display: flex;
      height: 100%;
      text-align: center;
      align-items: center;
    }

    h2 {
      flex: 1;
      font-size: 1.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    button {
      height: auto;
      padding: 0.4rem;

      &.checked {
        color: var(--primary);
      }
    }
  }

  > p {
    opacity: 0.8;
    font-size: 1.2rem;
    height: 4.8rem;
    overflow: auto;
  }
}

.claim-tile.active {
  border: 1px solid var(--primary);
  background-color: var(--translucent-primary-light);

  :deep(.checkbox-group.checked > i) {
    color: var(--primary);
  }
}
</style>
