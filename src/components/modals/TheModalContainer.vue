<template>
  <div
    v-if="!!currentModal"
    class="modal-container"
    :class="currentModalConfig?.backgroundClass"
  >
    <div class="modal-container__background" @click="onClickBackground()"></div>
    <component :is="currentModal" v-bind="currentModalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { ComponentOptions, computed, ref, shallowRef } from 'vue';

const modalRef = ref();
const currentModal = shallowRef<ComponentOptions | null>(null);
const currentModalConfig = shallowRef<any | null>(null);
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
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
  }
}

.modal {
  animation: animate-in 0.2s ease;
}

// Fade in and scale
@keyframes animate-in {
  from {
    opacity: 0.5;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

// Variations
.opaque {
  > .modal-container__background {
    background-color: var(--black);
  }
}

// Media queries
@media (max-width: 768px) {
  .modal {
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 0;
  }
}
</style>
