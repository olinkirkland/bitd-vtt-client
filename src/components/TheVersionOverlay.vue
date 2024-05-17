<template>
  <span class="version">{{ version }}</span>
</template>

<script setup lang="ts">
import { getServerVersion } from '@/util/version';
import { onMounted, ref } from 'vue';
const version = ref('');

onMounted(() => {
  getServerVersion().then((v) => (version.value = v));
});
</script>

<style lang="scss">
.version {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0.4rem;
  font-size: 1.2rem;
  opacity: 0.5;
  color: var(--light);

  &:hover {
    opacity: 1;
  }
}
</style>
