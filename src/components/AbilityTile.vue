<template>
  <div class="ability-tile" :class="{ active: props.ability.quantity > 0 }">
    <div class="header">
      <div class="row">
        <button
          class="btn btn--icon"
          @click="
            ModalController.open(EditAbilityModal, {
              ability: props.ability,
              idPrefix: props.idPrefix,
              onDelete: onDeleteAbility,
              onEdit: onEditAbility
            })
          "
        >
          <i class="fas fa-edit"></i>
        </button>
        <h2>{{ props.ability.name }}</h2>
      </div>
      <div class="row">
        <Checkbox
          v-for="i in ability.maxQuantity"
          :key="ability.id + i"
          v-model="checkboxValues"
          :value="i.toString()"
          @update:modelValue="updateQuantity(i.toString())"
        />
      </div>
    </div>
    <p>
      {{ props.ability.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { defineProps, ref } from 'vue';
import { Effectable } from '../game-data/game-data-types';
import Checkbox from './Checkbox.vue';
import EditAbilityModal from './modals/modal-content/EditAbilityModal.vue';
import Sheet from '@/game-data/sheets/sheet';

const props = defineProps<{
  ability: Effectable;
  idPrefix: string;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--translucent-light);
  padding: 1rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      height: auto;
      padding: 0.4rem;

      &.checked {
        color: var(--primary);
      }
    }
  }

  > p {
    opacity: 0.6;
  }
}

.ability-tile.active {
  border: 1px solid var(--primary);

  :deep(.checkbox-group.checked > i) {
    color: var(--primary);
  }
}
</style>
