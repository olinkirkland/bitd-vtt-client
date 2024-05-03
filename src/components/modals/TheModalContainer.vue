<template>
  <div
    v-if="!!currentModal"
    class="modal-container"
    :class="currentModalConfig?.variationClassName"
  >
    <div class="modal-container__background" @click="onClickBackground()"></div>
    <div class="modal">
      <div v-if="showHeader" class="modal__header">
        <span>{{ currentModalConfig?.headerText || 'Modal' }}</span>
        <button
          class="icon"
          v-if="currentModalConfig?.headerCloseButton"
          @click="ModalController.close()"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal__content">
        <component :is="currentModal" v-bind="currentModalConfig" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ModalController, { ModalConfig } from '@/controllers/modal-controller';
import { ComponentOptions, computed, shallowRef } from 'vue';

const currentModal = shallowRef<ComponentOptions | null>(null);
const currentModalConfig = shallowRef<ModalConfig | null>(null);
const showHeader = computed(
  () =>
    !!currentModalConfig.value?.headerText &&
    currentModalConfig.value?.headerCloseButton
);

function onClickBackground() {
  if (currentModalConfig.value?.closeOnClick) ModalController.close();
}

ModalController.getInstance().addEventListener(({ modal, modalConfig }) => {
  (document.activeElement as HTMLElement)?.blur();

  // Close
  if (!modal) return (currentModal.value = null);

  // Open
  currentModal.value = { ...modal };
  currentModalConfig.value = { ...modalConfig };
});
</script>

<style scoped lang="scss">
.modal-container {
  width: 100%;
  height: 100vh;
  max-height: -webkit-fill-available;
  position: absolute;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;

  > .modal-container__background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }
}

.modal {
  animation: animate-in 0.2s ease;
  min-width: 36rem;
  background-color: var(--dark);
  color: var(--light);
  border-radius: 5px;
  overflow: hidden;

  .modal__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--dark);
    border-bottom: 1px solid var(--dark-2);
    padding: 2rem;
  }

  .modal__content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
}

// Variations
.transparent-panel {
  > .panel.modal {
    background-color: transparent;
    box-shadow: none;
    border: none;
  }
}

.opaque-background {
  > .modal-container__background {
    background-color: var(--dark);
  }
}

@keyframes animate-in {
  from {
    transform: translateY(0.4rem);
  }
  to {
    transform: translateY(0);
  }
}
</style>
