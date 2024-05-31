<template>
  <div class="page">
    <div class="sheet-layout" v-if="currentSheet">
      <div class="row">
        <button class="btn btn--icon" @click="currentSheet = null">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1>{{ currentSheet.sheetType }}</h1>
        <button class="btn btn--icon delete" @click="onClickDeleteSheet">
          <i class="fas fa-trash"></i>
        </button>
      </div>

      <div v-if="currentSheet">
        <TheCrewSheet
          :sheet="(currentSheet as Crew)"
          v-if="currentSheet.sheetType === 'crew'"
        />
        <TheCharacterSheet
          :sheet="(currentSheet as Character)"
          v-if="currentSheet.sheetType === 'character'"
        />
      </div>
    </div>

    <div class="sheet-select-layout" v-else>
      <div class="row center sheet-type-select">
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
      <ul class="sheet-list">
        <li v-for="sheet in (sheets as Crew[] | Character[])" :key="sheet.id">
          <SheetCard :sheet="sheet" @click="currentSheet = sheet" />
        </li>
        <li>
          <div class="new-sheet-card" @click="onClickNewSheet">
            <i class="fas fa-folder-plus"></i>
            <span>New {{ sheetType }}</span>
          </div>
        </li>
      </ul>
      <PlayerBar class="mobile-hidden" />
    </div>
  </div>

  <button
    class="btn btn--alt debug"
    @click="showModelOverlay = true"
    v-if="!showModelOverlay"
  >
    <i class="fas fa-cogs"></i> Debug
  </button>

  <div class="model-overlay" v-if="showModelOverlay">
    <pre>{{ JSON.stringify(useGameStore().game, null, 2) }}</pre>
    <button class="btn debug btn--alt" @click="showModelOverlay = false">
      Close
    </button>
  </div>
</template>

<script setup lang="ts">
import SheetCard from '@/components/SheetCard.vue';
import PlayerBar from '@/components/game/PlayerBar.vue';
import { connectToGame, patch } from '@/controllers/game-controller';
import { Character } from '@/game-data/sheets/character-sheet';
import { Assassins, Crew } from '@/game-data/sheets/crew-sheet';
import Sheet from '@/game-data/sheets/sheet';
import { useGameStore } from '@/stores/game-store';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import TheCharacterSheet from './sheets/TheCharacterSheet.vue';
import TheCrewSheet from './sheets/TheCrewSheet.vue';
const route = useRoute();

const sheetType = ref('crew');
const sheets = computed(() => {
  const allSheets = Object.values(
    useGameStore().game?.data?.sheets || []
  ) as Sheet[];
  return allSheets.filter((sheet) => sheet.sheetType === sheetType.value);
});

const currentSheet = ref(null as Crew | Character | null);

const showModelOverlay = ref(false);

onMounted(() => {
  const gameId = route.params.id as string;
  connectToGame(gameId);
});

function onClickNewSheet() {
  // TODO rework this to let users pick the crew/character type
  let sheet: Sheet | null = null;

  switch (sheetType.value) {
    case 'crew':
      sheet = new Assassins();
      break;
    case 'character':
      // sheet = new Cutter();
      break;
  }

  if (!sheet) return console.error('Sheet not found');

  if (!useGameStore().game?.data?.sheets) {
    // If there's no data yet, create an empty array
    patch([
      {
        op: 'replace',
        path: '/data',
        value: { sheets: { [sheet.id]: sheet } }
      }
    ]);
  } else {
    patch([
      {
        op: 'add',
        path: `/data/sheets/${sheet.id}`,
        value: sheet
      }
    ]);
  }
}

function onClickDeleteSheet() {
  if (!currentSheet.value) return;

  patch([
    {
      op: 'remove',
      path: `/data/sheets/${currentSheet.value.id}`
    }
  ]);

  currentSheet.value = null;
}
</script>

<style scoped lang="scss">
.sheet-select-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > .player-bar {
    margin: 0 auto 2rem auto;
  }
}

.model-overlay {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  background-color: var(--translucent-heavy);
  backdrop-filter: blur(0.4rem);

  > pre {
    background: none;
    flex: 1;
    overflow: auto;
  }
}

button.debug {
  position: fixed;
  z-index: 99;
  right: 1rem;
  bottom: 1rem;
}

.sheet-type-select {
  padding: 1rem;
  margin-bottom: 0.4rem;
  box-shadow: var(--shadow);
}

ul.sheet-list {
  padding: 1rem;
  margin: 0;
  display: grid;
  width: 100%;
  flex: 1;
  align-content: start;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  overflow-y: auto;

  > li {
    cursor: pointer;

    &:hover {
      filter: brightness(1.1);
    }
  }
}

.new-sheet-card {
  border: 1px solid var(--primary);
  color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
  gap: 1rem;
  border-radius: 5px;
  background-color: var(--translucent-light);
  box-shadow: var(--shadow);
  transition: background-color 0.3s;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  > span {
    font-size: 1rem;
  }
}

.sheet-layout {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  > .delete {
    margin-left: auto;
  }
}
</style>
