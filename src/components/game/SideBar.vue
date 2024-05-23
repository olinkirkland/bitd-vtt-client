<template>
  <div class="side-bar">
    <ul>
      <li>
        <button class="btn btn--alt">
          <i class="fas fa-file-alt"></i>
          <span>Playbooks</span>
        </button>
      </li>
      <li>
        <button class="btn btn--alt">
          <i class="fas fa-file-alt"></i>
          <span>Crew</span>
        </button>
      </li>
      <li>
        <button class="btn btn--alt">
          <i class="fas fa-file-alt"></i>
          <span>World</span>
        </button>
      </li>
      <Divider />
      <li>
        <button class="btn btn--icon" @click="onClickGameOptions">
          <i class="fas fa-tasks"></i>
          <span>Options</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import Divider from '../Divider.vue';
import GameOptions from '../modals/modal-content/GameOptions.vue';

function onClickGameOptions() {
  ModalController.open(GameOptions);
}
</script>
<style scoped lang="scss">
.side-bar {
  padding: 1.2rem;
  background-color: var(--translucent-light);

  > ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
}
</style>
