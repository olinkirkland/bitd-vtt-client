<template>
  <!-- <h1>{{ crew }}</h1> -->
  <pre>{{ JSON.stringify(crew, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Crew } from '@/game-data/sheets/crew-sheet';

const props = defineProps<{
  crew: Crew;
}>();
</script>

<style scoped lang="scss"></style>
