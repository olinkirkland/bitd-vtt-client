<template>
  <div class="page-layout">
    <TheNavigation />
    <div class="page-layout__content">
      <router-view name="page"></router-view>
    </div>
    <TheFooter />
  </div>
  <TheModalContainer />
  <TheVersionOverlay />
</template>

<script setup lang="ts">
import TheFooter from './components/TheFooter.vue';
import TheNavigation from './components/TheNavigation.vue';
import TheVersionOverlay from './components/TheVersionOverlay.vue';
import TheModalContainer from './components/modals/TheModalContainer.vue';
</script>

<style lang="scss">
@import './assets/scss/styles.scss';
@import './assets/scss/fonts.scss';

.page-layout {
  display: flex;
  flex-direction: column;
  min-height: -webkit-fill-available;
  > .page-layout__content {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
