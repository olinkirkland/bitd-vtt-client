<template>
  <div class="checkbox-bar">
    <ul class="checkbox-list">
      <Checkbox
        v-for="i in props.max"
        :key="i"
        v-model="checkboxValues"
        :value="i.toString()"
        @update:modelValue="updateQuantity(i.toString())"
        :icon="i <= internalValue ? 'fa-check' : 'N/A'"
        class="flag"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue';
import Checkbox from './Checkbox.vue';

const props = defineProps<{
  value: number;
  max: number;
}>();

const emit = defineEmits<{
  (e: 'change', value: number): void;
}>();

const internalValue = ref(props.value);
const checkboxValues = ref<string[]>([]);
updateCheckboxes();

function updateCheckboxes() {
  checkboxValues.value = checkboxValuesFromQuantity(internalValue.value);
}

function checkboxValuesFromQuantity(quantity: number): string[] {
  return Array.from({ length: quantity }, (_, i) => (i + 1).toString());
}

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = newValue;
  }
);

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

  // TODO: Not gonna debug this right now, but largest is Negative Infinity
  internalValue.value = Math.max(largest, 0);
  emit('change', internalValue.value);
}
</script>

<style scoped lang="scss">
.checkbox-bar {
  display: flex;
  padding: 0.4rem 0.6rem;
  background-color: var(--translucent-light);
  width: 100%;
  overflow-x: auto;
}

h1 {
  width: 2rem;
  text-align: center;
  font-size: 3.6rem;
}

ul.checkbox-list {
  display: flex;
  gap: 0;

  .flag {
    padding: 0.2rem;
  }
}

:deep(.flag .icon) {
  border-radius: 0;
  margin: 0;
  width: 1.6rem;
  height: 2.4rem;
}
</style>
