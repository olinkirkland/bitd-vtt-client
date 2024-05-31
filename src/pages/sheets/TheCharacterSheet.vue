<template>
  <h1>{{ character.book }}</h1>
  <pre>{{ JSON.stringify(character, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Character } from '@/game-data/sheets/character-sheet';

const props = defineProps<{
  character: Character;
}>();
</script>

<style scoped lang="scss"></style>
