<template>
  <div class="portrait" :style="{ backgroundColor: portrait.commonColor }">
    <img :src="portrait.url" alt="Portrait" />
  </div>
</template>

<script setup lang="ts">
import { getPortrait } from '@/util/portrait';
import { computed } from 'vue';

const props = defineProps<{
  portraitId: string;
}>();

const portrait = computed(() => {
  return getPortrait(props.portraitId);
});
</script>

<style lang="scss" scoped>
.portrait {
  height: calc(100% - 1.2rem);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
