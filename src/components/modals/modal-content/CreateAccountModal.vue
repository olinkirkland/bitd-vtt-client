<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>Register an Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="create-account">
        <p>
          Choose a <em>username</em> and <em>password</em> to register your
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
            <span class="reminder shake-once" v-if="usernameError">
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
            <span class="reminder shake-once" v-if="passwordError">
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
            <span class="reminder shake-once" v-if="passwordConfirmationError">
              {{ passwordConfirmationError }}
            </span>
          </div>
        </div>
        <div class="row center">
          <button
            class="btn mobile-full-width"
            @click="ModalController.close()"
          >
            <span>Create Account</span>
          </button>
        </div>

        <div class="row center">
          <p>Already have an account?</p>
          <a href="#" @click="ModalController.open('login')">Log in</a>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import ModalController from '@/controllers/modal-controller';
import { computed, ref } from 'vue';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
const username = ref('');
const usernameTouched = ref(false);
const usernameError = computed(() => {
  if (!usernameTouched.value) return null;
  if (username.value.length === 0) return 'Cannot be blank';
  if (username.value.length < 3) return 'Must be at least 3 characters';
  if (username.value.length > 16) return 'Must have no more than 16 characters';
  if (!/^[a-zA-Z0-9]+$/.test(username.value)) return 'Letters and numbers only';
  return null;
});

const password = ref('');
const passwordWasTouched = ref(false);
const passwordError = computed(() => {
  if (!passwordWasTouched.value) return null;
  if (password.value.length === 0) return 'Cannot be blank';
  if (password.value.length < 8) return 'Must be at least 8 characters';
  if (password.value.length > 64) return 'Cannot be more than 64 characters';
  return null;
});

const passwordConfirmation = ref('');
const passwordConfirmationWasTouched = ref(false);
const passwordConfirmationError = computed(() => {
  if (!passwordConfirmationWasTouched.value) return null;
  if (passwordConfirmation.value.length === 0)
    return 'You must confirm your password';
  if (password.value !== passwordConfirmation.value)
    return 'Passwords do not match';
  return null;
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
    background-color: var(--translucent-light);
    padding: 2rem;
  }
}
</style>
