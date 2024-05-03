<template>
  <p>You're about to continue as a guest.</p>

  <div class="modal__footer">
    <button class="btn" @click="ModalController.close()">
      Continue as guest
    </button>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
</script>
