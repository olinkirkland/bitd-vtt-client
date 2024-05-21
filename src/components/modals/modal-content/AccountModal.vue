<template>
  <ModalFrame>
    <template v-slot:header>
      <ModalHeader closeButton>
        <h2>{{ useUserStore().username }}'s Account</h2>
      </ModalHeader>
    </template>
    <template v-slot:content>
      <div class="account">
        <p v-if="useUserStore().isGuest" class="guest-message">
          You are currently logged in as a guest.
        </p>

        <button
          class="btn btn--alt"
          @click="onClickLogout"
          v-if="!useUserStore().isGuest"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </button>
        <div class="row" v-else>
          <button class="btn" @click="onClickRegister">
            <span>Register Account</span>
          </button>
          <button class="btn btn--alt" @click="onClickLogin">
            <i class="fas fa-sign-out-alt"></i>
            <span>Login</span>
          </button>
        </div>

        <divider />

        <p>Select a portrait from the list below.</p>
        <ul class="portrait-select">
          <li
            v-for="portrait in useUserStore().portraits"
            :key="portrait.id"
            @click="onClickPortrait(portrait.id)"
            :class="{ selected: portrait.id === useUserStore().portrait }"
          >
            <Portrait :portraitId="portrait.id" />
            <div
              class="overlay"
              v-if="portrait.id === useUserStore().portrait"
            ></div>
            <i
              v-if="portrait.id === useUserStore().portrait"
              class="fas fa-check-circle"
            ></i>
          </li>
        </ul>

        <divider />
        <div class="row center id-block">
          <p class="muted text-center">ID: {{ useUserStore().id }}</p>
          <button class="btn icon muted" @click="onClickCopyId">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>
    </template>
  </ModalFrame>
</template>

<script setup lang="ts">
import { changePortrait, logout } from '@/api/account';
import Portrait from '@/components/Portrait.vue';
import ModalController from '@/controllers/modal-controller';
import { useUserStore } from '@/stores/user-store';
import ModalFrame from '../modal-parts/ModalFrame.vue';
import ModalHeader from '../modal-parts/ModalHeader.vue';
import CreateAccountModal from './CreateAccountModal.vue';
import LoginModal from './LoginModal.vue';

function onClickLogout() {
  ModalController.close();
  logout();
}

function onClickLogin() {
  ModalController.open(LoginModal);
}

function onClickCopyId() {
  navigator.clipboard.writeText(useUserStore().id);
}

function onClickRegister() {
  ModalController.open(CreateAccountModal);
}

function onClickPortrait(portraitId: string) {
  changePortrait(portraitId);
}
</script>

<style scoped lang="scss">
.account {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.id-block > button {
  color: var(--light);
}

.portrait-select {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5.2rem, 1fr));
  gap: 1.6rem;
  background-color: var(--translucent-light);
  padding: 2.4rem;

  > li {
    aspect-ratio: 1;
    // filter: brightness(0.8);
    transition: all 0.2s;
    cursor: pointer;
    overflow: hidden;
    border-radius: 5px;
    position: relative;

    &:not(.selected):hover {
      filter: brightness(1.1);
    }

    > .portrait {
      padding: 0.4rem; // Icons8 version
      max-height: unset;
    }

    > i {
      color: var(--light);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
    }

    .overlay {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--translucent-heavy);
      opacity: 0.5;
    }
  }
}
</style>
