<template>
  <div class="ability-tile">
    <h2>
      <button
        class="btn btn--icon"
        v-for="i in ability.maxQuantity"
        :key="i"
        :checked="i <= ability.quantity"
        @click="onClickCheckbox(i)"
      >
        <i
          class="fas"
          :class="i <= ability.quantity ? 'fa-check' : 'fa-square'"
        ></i>
      </button>
      {{ props.ability.name }}
    </h2>
    <p>
      {{ props.ability.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Effectable } from '../game-data/game-data-types';

const props = defineProps<{
  ability: Effectable;
  onChange: (value: number) => void;
}>();

function onClickCheckbox(i: number) {
  // TODO Bubble up the event, don't patch here
  if (props.ability.quantity === i) i--;
  // props.onChangeValue(i, `specialAbilities/${props.ability}/quantity`);
}
</script>

<style lang="scss" scoped>
.ability-tile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--translucent-light);
  padding: 1rem;
  color: var(--light);

  > p {
    opacity: 0.6;
  }
}
</style>
