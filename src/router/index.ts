import { createGuestAccount, fetchMyAccount } from '@/api/account';
import { fetchAccessToken } from '@/api/connection';
import GuestReminderModal from '@/components/modals/modal-content/GuestReminderModal.vue';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import ModalController from '@/controllers/modal-controller';
import TheGamesPage from '@/pages/TheGamesPage.vue';
import TheHomePage from '@/pages/TheHomePage.vue';
import TheInvitePage from '@/pages/TheInvitePage.vue';
import TheLostPage from '@/pages/TheLostPage.vue';
import TheSettingsPage from '@/pages/TheSettingsPage.vue';
import { useTokenStore } from '@/stores/token-store';
import { useUserStore } from '@/stores/user-store';
import { ref } from 'vue';
import { RouterOptions, createRouter, createWebHistory } from 'vue-router';
import TheGamePage from '../pages/TheGamePage.vue';

export const currentPageName = ref();

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    components: {
      page: TheHomePage
    },
    name: 'home'
  },
  {
    path: '/games',
    components: {
      page: TheGamesPage
    },
    name: 'games'
  },
  {
    path: '/game/:id',
    components: {
      page: TheGamePage
    },
    name: 'game'
  },
  {
    path: '/invite/:code',
    components: {
      page: TheInvitePage
    },
    name: 'invite'
  },
  {
    path: '/settings',
    components: {
      page: TheSettingsPage
    },
    name: 'settings'
  },
  {
    path: '/:pathMatch(.*)*',
    components: {
      page: TheLostPage // 404 page
    },
    name: 'lost'
  }
];

const routerOptions = {
  history: createWebHistory(),
  routes
};

export const router = createRouter(routerOptions as RouterOptions);

router.afterEach(async (to, from) => {
  ModalController.open(LoadingModal, { backgroundClass: 'opaque' });

  if (useTokenStore().refreshToken && !useTokenStore().accessToken)
    await fetchAccessToken();

  if (!useUserStore().id) await fetchMyAccount();

  if (!useTokenStore().refreshToken || !useUserStore().id)
    await createGuestAccount(); // Create a guest account

  ModalController.close();

  if (useUserStore().isGuest && !from.name)
    ModalController.open(GuestReminderModal);

  currentPageName.value = to.name;
});

router.beforeEach(async (to, from, next) => {
  next();
});
