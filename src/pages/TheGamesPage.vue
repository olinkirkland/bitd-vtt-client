<template>
  <div class="page">
    <h1>Games Page</h1>
    <button class="btn btn--alt" @click="onClickNewGame">
      <i class="fas fa-plus"></i>
      <span>New Game</span>
    </button>
    <ul class="game-list">
      <li v-for="game in games" :key="game.id">
        id: {{ game.id }}
        <br />
        createdAt: {{ game.createdAt }}
        <br />
        owner: {{ game.owner }}
        <br />
        players: {{ game.players }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
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
  padding: 0;
  margin: 0;
  display: grid;
}
</style>
