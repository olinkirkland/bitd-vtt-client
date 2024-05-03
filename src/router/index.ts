import { createAccount, fetchMyAccount } from '@/api/account';
import GuestReminderModal from '@/components/modals/modal-content/GuestReminderModal.vue';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import ModalController from '@/controllers/modal-controller';
import TheAccountPage from '@/pages/TheAccountPage.vue';
import TheLostPage from '@/pages/TheLostPage.vue';
import { useTokenStore } from '@/stores/token-store';
import { useUserStore } from '@/stores/user-store';
import { RouterOptions, createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    components: {
      page: TheAccountPage
    },
    name: 'home'
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

const router = createRouter(routerOptions as RouterOptions);

router.afterEach(async (to, from) => {
  ModalController.open(LoadingModal, { backgroundClass: 'opaque' });
  if (!useTokenStore().refreshToken || !(await fetchMyAccount()))
    await createAccount(); // Create a guest account

  if (!useUserStore().id) await fetchMyAccount();
  ModalController.close();

  if (useUserStore().isGuest && !from.name)
    ModalController.open(GuestReminderModal);
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;
