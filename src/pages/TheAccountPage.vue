<template>
  <div class="page">
    <panel id="account">
      <h1>Account</h1>
      <p>Refresh Token: {{ shortRefreshToken }}</p>
      <p>Access Token: {{ shortAccesstoken }}</p>
      <pre v-if="useUserStore().id">{{
        JSON.stringify(useUserStore(), null, 2)
      }}</pre>
      <button v-if="!useUserStore().isGuest" @click="onClickLogout()">
        Logout
      </button>
    </panel>
  </div>
</template>

<script setup lang="ts">
import { logout } from '@/api/account';
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
