<template>
  <div class="page">
    <h1>Settings Page</h1>
    <pre>{{ useUserStore() }}</pre>
    <button class="btn btn--alt" @click="ModalController.open(LoadingModal)">
      Foobar
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user-store';
import ModalController from '@/controllers/modal-controller';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
</script>

<style lang="scss" scoped></style>
