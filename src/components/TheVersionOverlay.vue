<template>
  <span class="version">{{ version }}</span>
</template>

<script setup lang="ts">
import { getServerVersion } from '@/util/version';
import { onMounted, ref } from 'vue';
const version = ref('');
import packageJson from '@/../package.json';

onMounted(() => {
  getServerVersion().then(
    (v) => (version.value = `c ${packageJson.version} / s ${v}`)
  );
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
