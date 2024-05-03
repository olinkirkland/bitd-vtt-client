<template>
  <div class="page">
    <div>
      <h1>Account</h1>
      <p>Refresh Token: {{ shortRefreshToken }}</p>
      <p>Access Token: {{ shortAccesstoken }}</p>
      <pre v-if="useUserStore().id">{{
        JSON.stringify(useUserStore(), null, 2)
      }}</pre>
      <button v-if="!useUserStore().isGuest" @click="onClickLogout()">
        <span>Logout</span>
      </button>

      <div v-else class="row">
        <button
          class="btn btn--alt"
          @click="
            ModalController.open(LoginModal, {
              headerText: 'Login',
              headerCloseButton: true
            })
          "
        >
          <span>Login</span>
        </button>
        <button class="btn" @click="ModalController.open(CreateAccountModal)">
          <span>Claim Guest Account</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logout } from '@/api/account';
import CreateAccountModal from '@/components/modals/modal-content/CreateAccountModal.vue';
import LoginModal from '@/components/modals/modal-content/LoginModal.vue';
import ModalController from '@/controllers/modal-controller';
import { useTokenStore } from '@/stores/token-store';
import { useUserStore } from '@/stores/user-store';
import { computed } from 'vue';

const shortRefreshToken = computed(() => {
  const token = useTokenStore().refreshToken;
  return token ? `${token.slice(0, 6)}...${token.slice(-6)}` : '[No token]';
});

const shortAccesstoken = computed(() => {
  const token = useTokenStore().accessToken;
  return token ? `${token.slice(0, 6)}...${token.slice(-6)}` : '[No token]';
});

async function onClickLogout() {
  logout();
}
</script>

<style lang="scss" scoped>
#account {
  width: 100%;
  max-width: 40rem;
}
</style>
