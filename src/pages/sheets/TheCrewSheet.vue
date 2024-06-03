<template>
  <div class="row center mobile-nav">
    <button
      class="btn btn--tab"
      @click="scrollToIndex(0)"
      :class="{ active: currentIndex == 0 }"
    >
      1 <i class="fas fa-file-alt"></i>
    </button>
    <button
      class="btn btn--tab"
      @click="scrollToIndex(1)"
      :class="{ active: currentIndex == 1 }"
    >
      2 <i class="fas fa-file-alt"></i>
    </button>
    <button
      class="btn btn--tab"
      @click="scrollToIndex(2)"
      :class="{ active: currentIndex == 2 }"
    >
      3 <i class="fas fa-file-alt"></i>
    </button>
  </div>
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
            @focus="focus = 'name'"
            @change="
              onChangeValue(($event.target as HTMLInputElement)?.value, 'name')
            "
          />
          <CollapsingShelf :show="focus == 'name'">
            <p>Choose a name for your crew.</p>
          </CollapsingShelf>
        </div>
        <div class="input-group">
          <label for="crew-reputation">Reputation</label>
          <input
            id="crew-reputation"
            type="text"
            :value="props.sheet.reputationType"
            @focus="focus = 'reputation'"
            @change="
              onChangeValue(
                ($event.target as HTMLInputElement)?.value,
                'reputationType'
              )
            "
          />
          <CollapsingShelf :show="focus == 'reputation'">
            <p>Choose how other underworld factions see you.</p>
            <div class="text-list">
              <button
                class="btn btn--text"
                v-for="reputation in codex.sheets.crew.reputations"
                @click="onChangeValue(reputation, 'reputationType')"
              >
                {{ reputation }}
              </button>
            </div>
          </CollapsingShelf>
        </div>
        <Divider />
        <div class="input-group">
          <label for="crew-lair">Lair</label>
          <input
            id="crew-lair"
            type="text"
            :value="props.sheet.lair"
            @focus="focus = 'lair'"
            @change="
              onChangeValue(($event.target as HTMLInputElement)?.value, 'lair')
            "
          />
          <CollapsingShelf :show="focus == 'lair'">
            <p>What does your lair look like?</p>
            <button class="btn btn--icon" @click="randomizeLair">
              <i class="fas fa-random"></i>
              <span>Randomize</span>
            </button>
          </CollapsingShelf>
          <div class="input-group">
            <label for="crew-lair-district">District</label>
            <input
              id="crew-lair-district"
              type="text"
              :value="props.sheet.lairDistrict"
              @focus="focus = 'lair-district'"
              @change="
                onChangeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'lair-district'
                )
              "
            />
            <CollapsingShelf :show="focus == 'lair-district'">
              <p>Where is your lair located?</p>
              <div class="text-list">
                <button
                  class="btn btn--text"
                  v-for="district in codex.lexicon.districts.map((d:any) => d.name)"
                  @click="onChangeValue(district, 'lairDistrict')"
                >
                  {{ district }}
                </button>
              </div>
            </CollapsingShelf>
          </div>
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
</template>

<script setup lang="ts">
import CollapsingShelf from '@/components/CollapsingShelf.vue';
import Divider from '@/components/Divider.vue';
import { patch } from '@/controllers/game-controller';
import { Crew } from '@/game-data/sheets/crew-sheet';
import { useGameStore } from '@/stores/game-store';
import { pick } from '@/util/rand-helper';
import { defineProps, onMounted, onUnmounted, ref } from 'vue';

const codex = useGameStore().game?.codex;

onMounted(() => {
  document.addEventListener('blur', onBlur, true);
});

onUnmounted(() => {
  document.removeEventListener('blur', onBlur, true);
});

function onBlur(event: FocusEvent) {
  // If the focused element has an ancestor with the class 'shelf', do nothing
  if (!event.relatedTarget) return (focus.value = null);
  const shelf = (event.relatedTarget as HTMLElement).closest('.shelf');
  if (shelf) return;

  focus.value = null;
}

const props = defineProps<{
  sheet: Crew;
}>();

const currentIndex = ref(0);
const lastScrolledTime = ref(Date.now());
const carouselRef = ref<HTMLElement | null>(null);

const focus = ref();

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

  // Scroll closest .sheet-layout to TOP (there is only one)
  const sheetLayout = carouselRef.value.closest('.sheet-layout');
  if (sheetLayout) sheetLayout.scrollTo({ top: 0, behavior: 'smooth' });
}

function randomizeLair() {
  const lairIdeas = codex.sheets.crew.lairs;
  const { name, districts } = pick(lairIdeas);
  const district = pick(districts);
  onChangeValue(name, 'lair');
  onChangeValue(district, 'lairDistrict');
}
</script>

<style scoped lang="scss">
.crew-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  overflow-x: hidden;

  > div {
    padding: 1rem;

    section {
      padding: 1rem;
      color: yellow;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}

.mobile-nav {
  display: none;

  justify-content: center;
  padding: 1rem;
  width: 100%;
  position: fixed;
  bottom: 0;

  background-color: var(--dark);
  box-shadow: var(--shadow);
}

@media (max-width: 768px) {
  .crew-layout {
    display: flex;

    > div {
      min-width: 100%;
      scroll-snap-align: start;
    }

    margin-bottom: 6.4rem;
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
