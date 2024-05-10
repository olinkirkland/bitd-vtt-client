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
  display: flex;
  flex-direction: column;
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
    flex: 1;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

@media (max-width: 768px) {
  .modal {
    border: none;
  }
}
</style>
