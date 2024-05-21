<template>
  <nav>
    <div class="logo">
      <router-link to="/home">
        <Logo />
      </router-link>
    </div>
    <div class="page-links">
      <router-link to="/">
        <button
          class="btn btn--page-link"
          :class="{ active: currentPageName === 'home' }"
        >
          <i class="fa fa-home"></i>
        </button>
      </router-link>

      <router-link to="/games">
        <button
          class="btn btn--page-link"
          :class="{ active: currentPageName === 'games' }"
        >
          <i class="fa fa-dice-three"></i>
        </button>
      </router-link>

      <router-link to="/settings">
        <button
          class="btn btn--page-link"
          :class="{ active: currentPageName === 'settings' }"
        >
          <i class="fa fa-cog"></i>
        </button>
      </router-link>
    </div>
    <div class="account">
      <button class="btn btn--account" @click="onClickAccount">
        <Portrait :portraitId="useUserStore().portrait" />
        <span>{{ useUserStore().username || 'Account' }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import AccountModal from '@/components/modals/modal-content/AccountModal.vue';
import ModalController from '@/controllers/modal-controller';
import { currentPageName } from '@/router';
import { useUserStore } from '@/stores/user-store';
import Portrait from './Portrait.vue';

function onClickAccount() {
  ModalController.open(AccountModal);
}
</script>

<style lang="scss" scoped>
nav {
  position: relative;
  background-color: var(--dark);
  border-bottom: 1px solid var(--dark-2);
  color: var(--light);
  display: flex;
  gap: 0.8rem;
  height: 5.2rem;
  align-items: center;

  > div {
    position: absolute;
    padding: 0 0.8rem;
  }

  .logo {
    left: 0;
  }
  .page-links {
    left: 50%;
    transform: translateX(-50%);
  }
  .account {
    right: 0;
  }
}

.logo h1 {
  font-size: 1.6rem;
  padding-left: 1.2rem;
  margin: 0;
  font-family: var(--title-font);
  font-weight: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--primary);
}

.page-links {
  display: flex;
  gap: 0.4rem;
  button.btn--page-link {
    color: var(--primary);
    background-color: transparent;

    &::after {
      border: none;
      border-bottom: 0.2rem solid transparent;
      width: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.5s;
    }

    &.active {
      filter: brightness(1);
    }

    &.active::after {
      width: 1rem;
      border-color: var(--primary);
    }
  }
}

button.btn.btn--account {
  background-color: var(--translucent-light);
  color: var(--primary);
  padding-left: 0.6rem;

  > .portrait {
    border-radius: 3px;
    height: calc(100% - 1.2rem);
  }

  &::after {
    content: none;
  }

  > span {
    // text-transform: uppercase;
    font-size: 1.4rem;
  }
}

@media (max-width: 768px) {
  nav > .page-links {
    right: 4.8rem; // Account button width
    left: unset;
    transform: unset;

    a:nth-child(1) {
      display: none;
    }
  }

  .account {
    padding: 0;
  }

  button.btn.btn--account {
    background-color: transparent;
    > span {
      display: none;
    }

    &::after {
      content: none;
    }
  }
}
</style>
