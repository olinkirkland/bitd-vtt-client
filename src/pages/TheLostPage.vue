<template>
  <div class="page">
    <panel id="lost">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <button @click="onClickGoHome()">Return</button>
    </panel>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
function onClickGoHome() {
  router.push('/');
}
</script>

<style lang="scss" scoped>
#lost {
  width: 100%;
  max-width: 40rem;
}
</style>
