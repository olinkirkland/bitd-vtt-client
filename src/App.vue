<template>
  <div class="page-layout">
    <!-- <TheHeader /> -->
    <div class="page-layout__content">
      <!-- <TheNavigation /> -->
      <router-view name="page"></router-view>
    </div>
  </div>
  <TheModalContainer />
</template>

<script setup lang="ts">
import TheModalContainer from './components/modals/TheModalContainer.vue';
</script>

<style lang="scss">
// @import './assets/css/variables.css';
@import './assets/css/styles.css';
// @import './assets/css/buttons.css';
// @import './assets/css/modals.css';
</style>
