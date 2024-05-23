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
  min-height: 100vh;
  min-height: -webkit-fill-available;
  max-height: 100vh;
  max-height: -webkit-fill-available;
  > .page-layout__content {
    flex: 1;
    overflow: hidden;
    display: flex;
  }
}
</style>
