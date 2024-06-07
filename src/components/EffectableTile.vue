<template>
  <div class="ability-tile" :class="{ active: props.ability.quantity > 0 }">
    <div class="header">
      <h2>{{ props.ability.name }}</h2>

      <button
        class="btn btn--icon"
        @click="
          ModalController.open(EditEffectableModal, {
            propertyName,
            effectable: props.ability,
            idPrefix: props.idPrefix,
            onDelete: onDeleteAbility,
            onEdit: onEditAbility
          })
        "
      >
        <i class="fas fa-edit"></i>
      </button>
    </div>
    <div class="row selection-bar">
      <Checkbox
        v-for="i in ability.maxQuantity"
        :key="ability.id + i"
        v-model="checkboxValues"
        :value="i.toString()"
        @update:modelValue="updateQuantity(i.toString())"
      />
    </div>
    <p>{{ props.ability.description }}</p>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { defineProps, ref } from 'vue';
import { Effectable } from '../game-data/game-data-types';
import Checkbox from './Checkbox.vue';
import EditEffectableModal from './modals/modal-content/EditEffectableModal.vue';

const props = defineProps<{
  ability: Effectable;
  idPrefix: string;
  propertyName: string;
  change: (quantity: number) => void;
  onEdit: (ability: Effectable) => void;
  onDelete: (id: string) => void;
}>();

const checkboxValues = ref<string[]>(
  checkboxValuesFromQuantity(props.ability.quantity)
);

// Watch for changes in the checkboxValues array
function updateQuantity(lastClicked: string) {
  let values = checkboxValues.value;

  // Uncheck all checkboxes larger than the last clicked checkbox
  values = values.filter((v) => parseInt(v) <= parseInt(lastClicked));

  const largest = Math.max(...values.map((v) => parseInt(v)));
  // Check all checkboxes smaller than the largest checkbox
  values = values.map((v) => (parseInt(v) <= largest ? v : lastClicked));

  // Set the checkboxValues array to a new array, equal to a range from 1 to the largest checkbox
  checkboxValues.value = Array.from({ length: largest }, (_, i) =>
    (i + 1).toString()
  );

  props.change(largest);
}

function checkboxValuesFromQuantity(quantity: number) {
  return Array.from({ length: quantity }, (_, i) => (i + 1).toString());
}

function onEditAbility(ability: Effectable) {
  props.onEdit(ability);
}

function onDeleteAbility(id: string) {
  props.onDelete(id);
}
</script>

<style lang="scss" scoped>
.ability-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: var(--translucent-light);
  padding: 1.6rem;
  padding-top: 2.2rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;
  margin-top: 1.2rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      flex: 1;
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
    font-size: 1.4rem;
  }

  .selection-bar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 0;

    width: fit-content;
    border-radius: 99px;
    border: 1px solid transparent;

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--darker);
      border-radius: 99px;
    }

    .checkbox-group {
      padding: 0.6rem 0.4rem;
      z-index: 1;

      // First and last, padding left or right 0.8
      &:first-child {
        padding-left: 0.6rem;
      }
      &:last-child {
        padding-right: 0.6rem;
      }
    }
  }
}

.ability-tile.active {
  border: 1px solid var(--primary);
  background-color: var(--translucent-primary-light);

  :deep(.checkbox-group.checked > i) {
    color: var(--primary);
  }

  .selection-bar {
    &::after {
      content: '';
      position: absolute;
      z-index: -1;
      width: calc(100% + 2px); // (1px border on each side
      height: calc(50% + 1px);
      bottom: -1px;
      left: -1px;
      right: 1px;
      background: var(--primary);
      border-radius: 0 0 99px 99px;
    }
  }
}
</style>
