<template>
  <div class="page">
    <h1>Games Page</h1>
    <ul class="game-list">
      <li v-for="game in games" :key="game._id">
        <GameCard :game="game" />
      </li>
      <li>
        <div class="new-game-card" @click="onClickNewGame">
          <i class="fas fa-folder-plus"></i>
          <span>New Game</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import GameCard from '@/components/GameCard.vue';
import CreateGameModal from '@/components/modals/modal-content/CreateGameModal.vue';
import ModalController from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/user-store';
import { computed } from 'vue';
async function onClickNewGame() {
  ModalController.open(CreateGameModal);
}

const games = computed(() => useUserStore().games);
</script>

<style lang="scss" scoped>
ul.game-list {
  padding: 1rem;
  margin: 0;
  display: grid;
  width: 100%;
  height: 100%;
  align-content: start;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
  overflow-y: auto;
}

.new-game-card {
  cursor: pointer;
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
</style>
