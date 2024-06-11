<template>
  <div class="checkbox-bar">
    <button
      @click="decrease"
      class="btn btn--icon"
      :class="{
        disabled: props.min !== undefined && internalValue <= props.min
      }"
    >
      <i class="fas fa-minus-circle"></i>
    </button>
    <h1>{{ value }}</h1>
    <button
      @click="increase"
      class="btn btn--icon"
      :class="{
        disabled: props.max !== undefined && internalValue >= props.max
      }"
    >
      <i class="fas fa-plus-circle"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue';

const props = defineProps<{
  value: number;
  min?: number;
  max?: number;
}>();

const emit = defineEmits<{
  (e: 'change', value: number): void;
}>();

const internalValue = ref(props.value);

watch(
  () => props.value,
  (newValue) => {
    internalValue.value = newValue;
  }
);

const increase = () => {
  if (props.max !== undefined && internalValue.value >= props.max) return;
  internalValue.value++;
  emit('change', internalValue.value);
};

const decrease = () => {
  if (props.min !== undefined && internalValue.value <= props.min) return;
  internalValue.value--;
  emit('change', internalValue.value);
};
</script>

<style scoped>
.checkbox-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--translucent-light);
  padding: 1rem;
}

h1 {
  width: 2rem;
  text-align: center;
  font-size: 3.6rem;
}
</style>
