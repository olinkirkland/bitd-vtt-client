<template>
  <p>You're not logged in. By clicking continue, a guest account will automatically be allocated to you. This account can be claimed later by adding an Email.</p>

  <div class="modal__footer">
    <button class="btn" @click="ModalController.close()">
      Continue
    </button>
  </div>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
</script>
