<template>
  <div class="sheet-layout__nested">
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
                onChangeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'name'
                )
              "
            />
            <CollapsingShelf :show="focus == 'name'">
              <p>Choose a name for your crew.</p>
            </CollapsingShelf>
          </div>
          <div class="input-group">
            <label for="reputation-type">Reputation</label>
            <input
              id="reputation-type"
              type="text"
              :value="props.sheet.reputationType"
              @focus="focus = 'reputation-type'"
              @change="
                onChangeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'reputationType'
                )
              "
            />
            <CollapsingShelf :show="focus == 'reputation-type'">
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
                onChangeValue(
                  ($event.target as HTMLInputElement)?.value,
                  'lair'
                )
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
        <section>
          <div class="input-block">
            <div class="input-group">
              <label for="crew-rep">Rep</label>
              <input
                id="crew-rep"
                type="number"
                :value="props.sheet.reputation"
                @focus="focus = 'reputation'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'reputation'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'reputation'">
                <p>How much rep does your crew have?</p>
              </CollapsingShelf>
            </div>
            <div class="input-group">
              <label for="crew-turf">Turf</label>
              <input
                id="crew-turf"
                type="number"
                :value="props.sheet.turf"
                @focus="focus = 'turf'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'turf'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'turf'">
                <p>How much turf does your crew control?</p>
              </CollapsingShelf>
            </div>
          </div>
          <div class="input-block">
            <div class="input-group">
              <label for="crew-hold">Hold</label>
              <div class="row">
                <button
                  class="btn btn--tab"
                  @click="onChangeValue('weak', 'hold')"
                  :class="{ active: props.sheet.hold == 'weak' }"
                >
                  Weak
                </button>
                <button
                  class="btn btn--tab"
                  @click="onChangeValue('strong', 'hold')"
                  :class="{ active: props.sheet.hold == 'strong' }"
                >
                  Strong
                </button>
              </div>
              <CollapsingShelf :show="focus == 'hold'">
                <p>How strong is your crew's hold on its turf?</p>
              </CollapsingShelf>
            </div>
            <div class="input-group">
              <label for="crew-tier">Tier</label>
              <input
                id="crew-tier"
                type="number"
                :value="props.sheet.tier"
                @focus="focus = 'tier'"
                @change="
                  onChangeValue(
                    ($event.target as HTMLInputElement)?.value,
                    'tier'
                  )
                "
              />
              <CollapsingShelf :show="focus == 'tier'">
                <p>What tier is your crew?</p>
              </CollapsingShelf>
            </div>
          </div>
        </section>
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
  focus.value = null;
}

const props = defineProps<{
  sheet: Crew;
}>();

const currentIndex = ref(0);
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
  // Get the current index from the scroll position
  const index = Math.round(carousel.scrollLeft / carousel.clientWidth);
  currentIndex.value = index;
}

function scrollToIndex(index: number) {
  if (!carouselRef.value) return;
  carouselRef.value.scrollTo({
    left: index * carouselRef.value.clientWidth,
    top: 0,
    behavior: 'smooth'
  });
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
.sheet-layout__nested {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.crew-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
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

.input-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  overflow: hidden;
}

.mobile-nav {
  display: none;

  justify-content: center;
  padding: 0.4rem;
  width: 100%;

  background-color: var(--dark);
  box-shadow: var(--shadow);
  z-index: 1;
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
