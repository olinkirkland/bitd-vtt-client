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
              placeholder="Enter a username"
              v-model="username"
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              v-model="password"
            />
          </div>
          <div class="input-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              v-model="passwordConfirmation"
            />
          </div>
        </div>
        <div class="row center">
          <button class="btn" @click="ModalController.close()">
            <span>Claim Account</span>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalController from '@/controllers/modal-controller';
import ModalFrame from '../modal-parts/modal-frame.vue';
import ModalHeader from '../modal-parts/modal-header.vue';
const username = ref('');
const password = ref('');
const passwordConfirmation = ref('');
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
