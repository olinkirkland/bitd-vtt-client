<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Guest Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="guest-reminder">
        <p>
          It doesn't look like you have your own account yet.<br />Your guest
          account's username is
          <em class="no-line-break">{{ useUserStore().username }}</em
          >.
        </p>
        <p class="muted">You can choose to claim this account now or later.</p>

        <div class="column center">
          <button class="btn btn--text" @click="ModalController.close()">
            <span>Continue as {{ useUserStore().username }}</span>
          </button>

          <span class="muted">or</span>

          <button class="btn" @click="ModalController.open(CreateAccountModal)">
            <span>Claim this Account</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/user-store';
import ModalFrame from '../modal-parts/modal-frame.vue';
import ModalHeader from '../modal-parts/modal-header.vue';
import CreateAccountModal from './CreateAccountModal.vue';
</script>

<style scoped lang="scss">
.guest-reminder {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}
</style>
