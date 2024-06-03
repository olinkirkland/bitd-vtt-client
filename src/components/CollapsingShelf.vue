<template>
  <div class="shelf" :class="{ show: props.show }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
const props = defineProps<{
  show: boolean;
}>();
</script>

<style lang="scss" scoped>
.shelf {
  width: 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
}

.shelf.show {
  max-height: 100rem;
  transition: max-height 1s ease-in-out;
}
</style>
