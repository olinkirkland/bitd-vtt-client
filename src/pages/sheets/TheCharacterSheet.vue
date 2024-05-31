<template>
  <h1>CHARACTER SHEET</h1>
  <pre>{{ JSON.stringify(sheet, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { Character } from '@/game-data/sheets/character-sheet';
import { defineProps } from 'vue';

const props = defineProps<{
  sheet: Character;
}>();
</script>

<style scoped lang="scss"></style>
