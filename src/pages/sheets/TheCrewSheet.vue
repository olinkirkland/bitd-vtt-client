<template>
  <!-- <pre>{{ JSON.stringify(sheet, null, 2) }}</pre> -->
  <div
    class="crew-layout"
    ref="carousel"
    @scroll="updateCurrentIndex($event.target as HTMLElement)"
  >
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
    <button @click="scrollToIndex(currentIndex - 1)">Previous</button>
    <button @click="scrollToIndex(currentIndex + 1)">Next</button>
  </div>
</template>

<script setup lang="ts">
import { Crew } from '@/game-data/sheets/crew-sheet';
import { defineProps, ref } from 'vue';

const props = defineProps<{
  sheet: Crew;
}>();

const currentIndex = ref(0);
const lastScrolledTime = ref(Date.now());
const carouselRef = ref<HTMLElement | null>(null);

function updateCurrentIndex(carousel: HTMLElement) {
  // If the carousel is at least 20% scrolled, update lastScrolledTime
  if (carousel.scrollLeft % carousel.clientWidth > carousel.clientWidth * 0.2)
    lastScrolledTime.value = Date.now();

  // Get the current index from the scroll position
  const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
  currentIndex.value = index;
}

function scrollToIndex(index: number) {
  if (!carouselRef.value) return;
  carouselRef.value.scrollTo({
    left: index * carouselRef.value.clientWidth,
    behavior: 'smooth'
  });
}
</script>

<style scoped lang="scss">
.crew-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 2px solid yellow;
  width: 100%;
  overflow-x: hidden;

  > div {
    border: 1px solid blue;
    section {
      border: 1px solid red;
      padding: 1rem;
      color: white;
    }
  }
}

@media (max-width: 800px) {
  .crew-layout {
    overflow-x: auto;
    scroll-snap-type: x mandatory;

    > div {
      min-width: 100%;
      scroll-snap-align: start;
    }
  }
}
</style>
