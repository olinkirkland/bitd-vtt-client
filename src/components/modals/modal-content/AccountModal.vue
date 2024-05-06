<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>{{ useUserStore().username }}'s Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="account">
        <p v-if="useUserStore().isGuest" class="guest-message">
          You are currently logged in as a guest.
        </p>

        <button
          class="btn btn--alt"
          @click="onClickLogout"
          v-if="!useUserStore().isGuest"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
        <div class="row" v-else>
          <button class="btn" @click="onClickRegister">
            <span>Register Account</span>
          </button>
          <button class="btn btn--alt" @click="onClickLogin">
            <i class="fas fa-sign-out-alt"></i>
            <span>Login</span>
          </button>
        </div>

        <divider />
        <div class="row center id-block">
          <p class="muted text-center">ID: {{ useUserStore().id }}</p>
          <button class="btn icon muted" @click="onClickCopyId">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { logout } from '@/api/account';
import ModalController from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/user-store';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import CreateAccountModal from './CreateAccountModal.vue';
import LoginModal from './LoginModal.vue';

function onClickLogout() {
  ModalController.close();
  logout();
}

function onClickLogin() {
  ModalController.open(LoginModal);
}

function onClickCopyId() {
  navigator.clipboard.writeText(useUserStore().id);
}

function onClickRegister() {
  ModalController.open(CreateAccountModal);
}
</script>

<style scoped lang="scss">
.account {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.id-block > button {
  color: var(--light);
}
</style>
