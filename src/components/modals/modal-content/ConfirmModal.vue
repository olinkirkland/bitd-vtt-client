<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton :closeButtonAction="onClickClose">
        <h2>{{ props.title }}</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="confirm">
        <p v-html="props.message"></p>

        <div class="column center">
          <button class="btn" @click="props.onCancel">
            <span>{{ props.onCancelText || 'No, I changed my mind' }}</span>
          </button>
          <span class="muted">or</span>
          <button class="btn btn--text" @click="props.onConfirm">
            <span>{{ props.onConfirmText || 'Yes, continue' }}</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';

const props = defineProps<{
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onConfirmText?: string;
  onCancelText?: string;
}>();

function onClickClose() {
  console.log('close');
  props.onCancel();
}
</script>

<style scoped lang="scss">
.confirm {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
