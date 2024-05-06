<template>
  <div class="page">
    <pre v-if="useUserStore().id">{{
      JSON.stringify(useUserStore(), null, 2)
    }}</pre>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style lang="scss" scoped>
#account {
  width: 100%;
  max-width: 40rem;
}
</style>
