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
    (v) => (version.value = `${packageJson.version} / ${v}`)
  );
});
</script>

<style lang="scss">
.version {
  position: fixed;
  bottom: 0.4rem;
  right: 0.4rem;
  padding: 0.2rem 0.4rem;
  font-size: 1rem;
  letter-spacing: 2px;
  background-color: var(--translucent-heavy);
  opacity: 0.5;
  text-transform: uppercase;
  color: var(--light);
  z-index: 999;
  pointer-events: none;
}
</style>
