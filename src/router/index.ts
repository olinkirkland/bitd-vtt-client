import { fetchMyAccount } from '@/api/account';
import TheAccountPage from '@/pages/the-account-page.vue';
import TheLoginPage from '@/pages/the-login-page.vue';
import TheLostPage from '@/pages/the-lost-page.vue';
import { RouterOptions, createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/account'
  },
  {
    path: '/login',
    components: {
      page: TheLoginPage
    },
    name: 'login'
  },
  {
    path: '/account',
    components: {
      page: TheAccountPage
    },
    name: 'account'
  },
  {
    path: '/:pathMatch(.*)*',
    components: {
      app: TheLostPage
    },
    name: '404'
  }
];

const routerOptions = {
  history: createWebHistory(),
  routes
};

const router = createRouter(routerOptions as RouterOptions);

router.afterEach(async (to, from) => {});

router.beforeEach(async (to, from, next) => {
  // Try to fetch me
  // If it fails, redirect to login
  await fetchMyAccount();

  next();
});

export default router;
