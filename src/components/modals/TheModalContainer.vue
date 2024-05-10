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
import { ComponentOptions, ref, shallowRef } from 'vue';

const modalRef = ref();
const currentModal = shallowRef<ComponentOptions | null>(null);
const currentModalConfig = shallowRef<any | null>(null);
const fadeInterval = ref();

function onClickBackground() {
  if (currentModalConfig.value?.closeOnClick) ModalController.close();
}

ModalController.getInstance().addEventListener(({ modal, modalConfig }) => {
  (document.activeElement as HTMLElement)?.blur();
  if (fadeInterval.value) clearInterval(fadeInterval.value);

  // Close
  if (!modal) return (currentModal.value = null);

  // Open
  currentModal.value = { ...modal };
  currentModalConfig.value = { ...modalConfig };

  requestAnimationFrame(() => {
    const modal = modalRef.value?.$el;
    if (!modal) return;
    const modalHeaderChildren = modal.querySelector('.modal__header')
      ? [modal.querySelector('.modal__header')]
      : [];
    const modalContentChildren = Array.from<HTMLElement>(
      modal.querySelector('.modal__content > div')?.children || []
    );
    const modalChildren = [...modalHeaderChildren, ...modalContentChildren];

    modalChildren.forEach((childEl: any) => childEl.classList.add('hidden'));

    fadeInterval.value = setInterval(() => {
      if (!modalChildren.length) clearInterval(fadeInterval.value);
      else modalChildren.shift()?.classList.remove('hidden');
    }, 50);
  });
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
  max-height: calc(100vh - 4rem);
}

:deep(.modal .hidden) {
  opacity: 0;
}

:deep(.modal *) {
  transition: opacity 0.5s ease;
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
    max-height: 100%;
    height: 100%;
    border-radius: 0;
    animation: none;
  }
}
</style>
