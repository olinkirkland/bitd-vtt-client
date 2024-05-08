<template>
  <div class="page">
    <h1>INVITE PAGE</h1>
    <p>{{ inviteId }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const inviteId = route.params.code as string;
</script>

<style scoped lang="scss"></style>
