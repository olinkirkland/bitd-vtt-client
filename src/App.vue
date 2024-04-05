<template>
  <div class="container">
    <panel id="createAccount">
      <button @click="chooseNewValues">Choose new values</button>
      <p>Username: {{ username }}</p>
      <p>Password: {{ password }}</p>
      <button @click="onClickCreateAccount()">Create account</button>
    </panel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createAccount } from './api/account';
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
