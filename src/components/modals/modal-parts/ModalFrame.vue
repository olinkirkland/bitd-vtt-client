<template>
  <div class="modal">
    <slot name="header"></slot>
    <div class="modal__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.modal {
  animation: animate-in 0.2s ease;
  min-width: 36rem;
  max-width: 56rem;
  background-color: var(--dark);
  border: 1px solid var(--dark-2);
  color: var(--light);
  overflow: hidden;
  box-shadow: var(--close-shadow);

  .modal__content {
    padding: 2rem;
    height: 100%;
  }
}
</style>
