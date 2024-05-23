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
  // Determine global tooltip position
  if (rect.right > window.innerWidth) {
    tooltip.value.classList.add('tooltip--touching-right');
    tooltip.value.style.right = `0`;
  }
});
</script>

<style scoped lang="scss">
*:not(:hover) + .tooltip {
  opacity: 0;
}

.tooltip {
  position: absolute;
  opacity: 1;
  transition: all 0.4s;
  pointer-events: none;

  &--top {
    top: unset;
    bottom: calc(100% + 0.4rem);
    &::before {
      border-bottom: 0;
      border-top: 0.8rem solid var(--translucent-heavy);
      transform: translateX(-50%) translateY(2.6rem);
    }
  }

  &--touching-right::before {
    right: 0;
    left: unset;
  }
}
</style>
