<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader>
        <h2>{{ props.title }}</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="info">
        <p>{{ props.message }}</p>
        <button class="btn" @click="onClickRedirectToGamesPage">
          <span>Okay</span>
        </button>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import { router, PageName } from '@/router';

const props = defineProps<{
  title: string;
  message: string;
}>();

function onClickRedirectToGamesPage() {
  router.push({ name: PageName.GAMES });
}
</script>

<style scoped lang="scss">
.modal {
  .info {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }
}
:deep(.modal__header) {
  h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
