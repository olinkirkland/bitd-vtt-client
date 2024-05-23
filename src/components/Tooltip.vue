<template>
  <div class="tooltip" :class="{ 'tooltip--top': top }" ref="tooltip">
    <span v-html="text"></span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  text: string;
  top?: boolean;
}>();

const tooltip = ref<HTMLElement | null>(null);

onMounted(() => {
  // Ensure the tooltip doesn't overflow the window
  if (!tooltip.value) return console.error('Tooltip element not found');
  const rect = tooltip.value.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    tooltip.value.style.left = `calc(100% - ${rect.width}px - 0.8rem)`;
    tooltip.value.classList.add('tooltip--no-arrow');
  }
  if (rect.left < 0) {
    tooltip.value.style.left = '0';
    tooltip.value.classList.add('tooltip--no-arrow');
  }
});
</script>

<style scoped lang="scss"></style>
