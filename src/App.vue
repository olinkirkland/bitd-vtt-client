<template>
  <div class="page-layout">
    <TheNavigation />
    <div class="page-layout__content">
      <router-view name="page"></router-view>
    </div>
  </div>
  <TheModalContainer />
</template>

<script setup lang="ts">
import TheNavigation from './components/TheNavigation.vue';
import TheModalContainer from './components/modals/TheModalContainer.vue';
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
@import './assets/scss/fonts.scss';

.page-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  > .page-layout__content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
