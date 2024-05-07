<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Login</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="game-preview">
        <p>TODO info about this game</p>
        <button>
          <span>Join Game</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    background-color: var(--translucent-light);
    padding: 2rem;
  }
}
</style>
