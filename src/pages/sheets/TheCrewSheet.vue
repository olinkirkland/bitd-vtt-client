<template>
  <!-- <pre>{{ JSON.stringify(sheet, null, 2) }}</pre> -->
  <div class="sheet-layout">
    <div class="main-and-claims">
      <section>NAME, REPUTATION, LAIR</section>
      <section>REP, TURF, HOLD, TIER</section>
      <section>CLAIMS</section>
      <section>HEAT, WANTED LEVEL, COINS, VAULTS</section>
    </div>
    <div class="abilities-xp-and-contacts">
      <section>ABILITIES</section>
      <section>XP</section>
      <section>CONTACTS</section>
    </div>
    <div class="upgrades-and-cohorts">
      <section>UPGRADES</section>
      <section>COHORTS</section>
    </div>
  </div>
  <div class="row center mobile-nav">
    <button
      class="btn btn--tab"
      :class="{ active: sheetType === 'crew' }"
      @click="sheetType = 'crew'"
    >
      <i class="fas fa-users"></i>
      <span>Crew Sheets</span>
    </button>
    <button
      class="btn btn--tab"
      :class="{ active: sheetType === 'character' }"
      @click="sheetType = 'character'"
    >
      <i class="fas fa-user"></i>
      <span>Character Sheets</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Crew } from '@/game-data/sheets/crew-sheet';
import { defineProps, ref } from 'vue';

const props = defineProps<{
  sheet: Crew;
}>();

const mobileLayoutPage = ref(0);
</script>

<style scoped lang="scss">
.sheet-layout {
  border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  section {
    border: 1px solid red;
    padding: 1rem;
    color: white;
  }
}
</style>
