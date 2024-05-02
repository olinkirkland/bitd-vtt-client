<template>
  <div class="page-layout">
    <TheHeader />
    <div class="page-layout__content">
      <TheNavigation />
      <router-view name="page"></router-view>
    </div>
  </div>
  <modal-manager />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// Global keyboard shortcuts
// =================================================================================================
window.addEventListener('keydown', (event) => {
  if (window.location.hostname === 'localhost') {
    // if (event.ctrlKey && event.key === '`') router.push('/model');
  } else {
    // if (event.ctrlKey && event.key === '`') router.push('/settings');
  }
});
</script>

<style lang="scss">
// @import './assets/css/variables.css';
@import './assets/css/styles.css';
// @import './assets/css/buttons.css';
// @import './assets/css/modals.css';
</style>
