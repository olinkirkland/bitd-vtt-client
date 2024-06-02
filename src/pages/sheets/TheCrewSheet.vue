<template>
  <div
    class="crew-layout"
    ref="carouselRef"
    @scroll="updateCurrentIndex($event.target as HTMLElement)"
  >
    <div class="main-and-claims">
      <section>
        <div class="input-group">
          <label for="crew-name">Name</label>
          <input
            id="crew-name"
            type="text"
            :value="props.sheet.name"
            @change="
              onChangeValue(($event.target as HTMLInputElement)?.value, 'name')
            "
          />
        </div>
        <div class="input-group">
          <label for="crew-reputation">Reputation</label>
          <input
            id="crew-reputation"
            type="text"
            :value="props.sheet.reputationType"
            @change="
              onChangeValue(
                ($event.target as HTMLInputElement)?.value,
                'reputationType'
              )
            "
          />
        </div>
        <div class="input-group">
          <label for="crew-lair">Lair</label>
          <input
            id="crew-lair"
            type="text"
            :value="props.sheet.lair"
            @change="
              onChangeValue(($event.target as HTMLInputElement)?.value, 'lair')
            "
          />
        </div>
        <div class="input-group">
          <label for="crew-lair-district">Lair District</label>
          <input
            id="crew-lair-district"
            type="text"
            :value="props.sheet.lairDistrict"
            @change="
              onChangeValue(
                ($event.target as HTMLInputElement)?.value,
                'lair-district'
              )
            "
          />
        </div>
      </section>
      <Divider />
      <section>REP, TURF, HOLD, TIER</section>
      <Divider />
      <section>CLAIMS</section>
      <Divider />
      <section>HEAT, WANTED LEVEL, COINS, VAULTS</section>
    </div>
    <div class="abilities-xp-and-contacts">
      <section>ABILITIES</section>
      <Divider />
      <section>XP</section>
      <Divider />
      <section>CONTACTS</section>
    </div>
    <div class="upgrades-and-cohorts">
      <section>UPGRADES</section>
      <Divider />
      <section>COHORTS</section>
    </div>
  </div>
  <div class="row center mobile-nav">
    <button class="btn" @click="scrollToIndex(0)">Main</button>
    <button class="btn" @click="scrollToIndex(1)">Abilities</button>
    <button class="btn" @click="scrollToIndex(2)">Upgrades</button>
  </div>
</template>

<script setup lang="ts">
import Divider from '@/components/Divider.vue';
import { patch } from '@/controllers/game-controller';
import { Crew } from '@/game-data/sheets/crew-sheet';
import { defineProps, ref } from 'vue';

const props = defineProps<{
  sheet: Crew;
}>();

const currentIndex = ref(0);
const lastScrolledTime = ref(Date.now());
const carouselRef = ref<HTMLElement | null>(null);

function onChangeValue(value: any, partialPath: string) {
  const path = `/data/sheets/${props.sheet.id}/${partialPath}`;
  patch([
    {
      op: 'replace',
      path,
      value
    }
  ]);
}

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
  width: 100%;
  overflow-x: hidden;

  > div {
    background: var(--translucent-light);
    padding: 1rem;

    section {
      padding: 1rem;
      color: white;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}

.mobile-nav {
  display: none;
}

@media (max-width: 768px) {
  .crew-layout {
    display: flex;

    > div {
      min-width: 100%;
      scroll-snap-align: start;
    }
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
