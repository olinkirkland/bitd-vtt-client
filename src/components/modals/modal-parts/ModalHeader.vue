<template>
  <div class="modal__header">
    <slot></slot>
    <button class="icon" v-if="closeButton" @click="ModalController.close()">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';

defineProps({
  closeButton: Boolean
});
</script>

<style lang="scss" scoped>
.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--dark);
  border-bottom: 1px solid var(--dark-2);
  width: 100%;
  min-height: 5.2rem;
  padding: 0 2rem;
  gap: 1.6rem;
}
</style>
