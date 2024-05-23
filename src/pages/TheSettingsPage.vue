<template>
  <div class="page">
    <h1>App Settings</h1>
    <!-- <pre>{{ useUserStore() }}</pre> -->
    <button
      class="btn btn--alt"
      @click="ModalController.open(AttributionModal)"
    >
      Attribution
    </button>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import AttributionModal from '@/components/modals/modal-content/AttributionModal.vue';
</script>

<style lang="scss" scoped></style>
