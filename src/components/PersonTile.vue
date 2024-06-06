<template>
  <div class="person-tile" :class="{ active: props.person.attitude !== 0 }">
    <i class="fas fa-theater-masks"></i>
    <div class="person-tile__content">
      <div class="header">
        <h2>{{ props.person.name }}</h2>

        <button class="btn btn--icon disabled">
          <i class="fas fa-edit"></i>
        </button>
      </div>
      <div class="row selection-bar">
        <!-- <Checkbox
        v-for="i in availableAttitudes"
        :key="person.id + i"
        v-model="checkboxValues"
        :value="i.toString()"
        @update:modelValue="updateQuantity(i.toString())"
      /> -->
      </div>

      <p>{{ props.person.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { Person } from '../game-data/game-data-types';

const props = defineProps<{
  person: Person;
  idPrefix: string;
  change: (person: Person, attitude: number) => void;
  onEdit: (person: Person) => void;
  onDelete: (id: string) => void;
}>();

const checkboxValues = ref<string[]>(
  checkboxValuesFromQuantity(props.person.attitude)
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

  // props.change(largest);
}

function checkboxValuesFromQuantity(quantity: number) {
  return Array.from({ length: quantity }, (_, i) => (i + 1).toString());
}

function onEditPerson(person: Person) {
  props.onEdit(person);
}

function onDeletePerson(id: string) {
  props.onDelete(id);
}
</script>

<style lang="scss" scoped>
.person-tile {
  position: relative;
  display: flex;
  gap: 1rem;
  background-color: var(--translucent-light);
  padding: 1.6rem;
  padding-top: 2.2rem;
  color: var(--light);
  border: 1px solid transparent;
  transition: border 0.2s;
  margin-top: 1.2rem;
  width: 100%;

  > i {
    // fit the font size to the height of the parent
    font-size: 4rem;
    color: var(--translucent-primary-heavy);
  }

  > .person-tile__content {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    flex: 1;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      text-align: center;
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

.person-tile.active {
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
