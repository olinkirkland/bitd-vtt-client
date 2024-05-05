<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Claim Guest Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="create-account">
        <p>
          Enter a <em>username</em> and <em>password</em> to claim the guest
          account.
        </p>
        <div class="inputs">
          <div class="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              @input="usernameTouched = true"
              placeholder="Enter a username"
              v-model="username"
            />
            <span class="reminder" v-if="usernameError">
              {{ usernameError }}
            </span>
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              @input="passwordWasTouched = true"
              placeholder="Create a password"
              v-model="password"
            />
            <span class="reminder" v-if="passwordError">
              {{ passwordError }}
            </span>
          </div>
          <div class="input-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              @input="passwordConfirmationWasTouched = true"
              placeholder="Confirm your password"
              v-model="passwordConfirmation"
            />
            <span class="reminder" v-if="passwordConfirmationError">
              {{ passwordConfirmationError }}
            </span>
          </div>
        </div>
        <div class="row center" :class="{ disabled: !canClaimAccount }">
          <button class="btn" @click="ModalController.close()">
            <span>Claim Account</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/modal-frame.vue';
import ModalHeader from '../modal-parts/modal-header.vue';
const username = ref('');
const usernameTouched = ref(false);
const usernameError = computed(() => {
  if (!usernameTouched.value) return null;
  if (username.value.length === 0) return 'Username is required';
  if (username.value.length < 4)
    return 'Username must be at least 3 characters';
  if (!/^[a-zA-Z0-9]+$/.test(username.value))
    return 'Username must have letters and numbers only';
  return null;
});

const password = ref('');
const passwordWasTouched = ref(false);
const passwordError = computed(() => {
  if (!passwordWasTouched.value) return null;
  if (password.value.length === 0) return 'Password is required';
  if (password.value.length < 8)
    return 'Password must be at least 8 characters';
  return null;
});

const passwordConfirmation = ref('');
const passwordConfirmationWasTouched = ref(false);
const passwordConfirmationError = computed(() => {
  if (!passwordConfirmationWasTouched.value) return null;
  if (passwordConfirmation.value.length === 0)
    return 'Password confirmation is required';
  if (password.value !== passwordConfirmation.value)
    return 'Passwords do not match';
  return null;
});

const canClaimAccount = computed(() => {
  return (
    username.value.length > 0 &&
    password.value.length > 0 &&
    password.value === passwordConfirmation.value
  );
});
</script>

<style scoped lang="scss">
.create-account {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 2rem;
  }
}
</style>
