<template>
  <div class="container">
    <panel id="createAccount">
      <button @click="chooseNewValues">Choose new values</button>
      <p>Username: {{ username }}</p>
      <p>Password: {{ password }}</p>
      <button @click="onClickCreateAccount()">Create account</button>
      <button @click="onClickLogin()">Login</button>
    </panel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createAccount, login } from './api/account';
import { makeRandomName, makeRandomPassword } from './names';

const username = ref(makeRandomName());
const password = ref(makeRandomPassword());

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
