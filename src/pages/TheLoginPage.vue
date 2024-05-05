<template>
  <div class="page">
    <panel id="createAccount">
      <h1>Create Account | Login</h1>
      <div class="row">
        <button @click="onClickCreateAccount()">Create account</button>
        <button @click="onClickLogin()">Login</button>
      </div>
    </panel>
  </div>
</template>

<script setup lang="ts">
import { claimAccount, login } from '@/api/account';
import router from '@/router';
import { ref } from 'vue';

const username = ref();
const password = ref();

async function onClickCreateAccount() {
  console.log('Creating account...');
  const response = await claimAccount(username.value, password.value);
  console.log(response ? 'Account created' : 'Failed to create account');
}

async function onClickLogin() {
  console.log('Logging in...');
  const response = await login(username.value, password.value);
  console.log(response ? 'Logged in' : 'Failed to log in');
  if (response) router.push('/account');
}
</script>

<style lang="scss">
#createAccount {
  width: 100%;
  max-width: 40rem;
}
</style>
