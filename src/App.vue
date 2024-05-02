<template>
  <div class="container">
    <panel id="createAccount">
      <button @click="chooseNewValues">Choose new values</button>
      <p>Username: {{ username }}</p>
      <p>Password: {{ password }}</p>
      <div class="row">
        <button @click="onClickCreateAccount()">Create account</button>
        <button @click="onClickLogin()">Login</button>
      </div>
      <p>Refresh Token: {{ shortRefreshToken }}</p>
      <p>Access Token: {{ shortAccesstoken }}</p>
    </panel>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { createAccount, login } from './api/account';
import { makeRandomName, makeRandomPassword } from './names';
import { useTokenStore } from './stores/token-store';

const username = ref(makeRandomName());
const password = ref(makeRandomPassword());

const shortRefreshToken = computed(() => {
  const token = useTokenStore().refreshToken;
  return token ? `${token.slice(0, 6)}...${token.slice(-6)}` : '[No token]';
});

const shortAccesstoken = computed(() => {
  const token = useTokenStore().accessToken;
  return token ? `${token.slice(0, 6)}...${token.slice(-6)}` : '[No token]';
});

function chooseNewValues() {
  username.value = makeRandomName();
  password.value = makeRandomPassword();
}

async function onClickCreateAccount() {
  console.log('Creating account...');
  const success = await createAccount(username.value, password.value);
  console.log(success ? 'Account created' : 'Failed to create account');
}

async function onClickLogin() {
  console.log('Logging in...');
  const success = await login(username.value, password.value);
  console.log(success);
  console.log(success ? 'Logged in' : 'Failed to log in');
}
</script>

<style lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#createAccount {
  width: 40rem;
}
</style>
