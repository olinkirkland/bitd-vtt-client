<template>
  <div
    class="checkbox-group"
    :class="{ compact: !label?.length, checked }"
    @click="handleChange"
  >
    <i class="fas" :class="checked ? 'fa-check-circle' : 'fa-circle'"></i>
    <p>{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Boolean, Array],
    required: true
  },
  label: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  }
});

const emit = defineEmits();

const checked = computed(() => {
  if (!(props.value && Array.isArray(props.modelValue)))
    return props.modelValue;
  return props.modelValue.includes(props.value);
});

function handleChange(event: Event) {
  event.preventDefault();
  if (!(props.value && Array.isArray(props.modelValue)))
    return emit('update:modelValue', !props.modelValue);

  if (props.modelValue.includes(props.value))
    props.modelValue.splice(props.modelValue.indexOf(props.value), 1);
  else props.modelValue.push(props.value);

  emit('update:modelValue', props.modelValue);
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: fit-content;
  height: 3.2rem;
  background-color: var(--dark);
  border-radius: 3px;
  padding: 0 0.8rem;
  cursor: pointer;
  color: var(--light);

  &.compact {
    background-color: transparent;
    padding: 0.4rem;
    height: fit-content;
    p {
      display: none;
    }
  }

  > i {
    transition-property: transform, color;
    transition-duration: 0.2s;
    transform: scale(0.8);
    font-size: 1.6rem;
    // color: var(--primary-3);
    // Don't flex shrink
    flex: 0 0 auto;
  }

  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    margin-right: 0.2rem;
    font-size: 1.4rem;
    font-style: italic;
  }

  &.checked {
    > i {
      transform: scale(1);
      // color: var(--primary);
    }
  }
}
</style>
