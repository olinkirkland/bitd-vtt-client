import GuestReminderModal from '@/components/modals/modal-content/GuestReminderModal.vue';
import ModalController from '@/controllers/modal-controller';
import { router } from '@/router';
import { useTokenStore } from '../stores/token-store';
import { useUserStore } from '../stores/user-store';
import { server } from './connection';

export async function createGuestAccount() {
  try {
    const response = await server.post('/account/create-guest');
    if (response.data.refreshToken) {
      useTokenStore().storeRefreshToken(response.data.refreshToken);
      useTokenStore().accessToken = response.data.accessToken;
      await fetchMyAccount();
    }
    return response.data;
  } catch {
    return null;
  }
}

export async function registerAccount(username?: string, password?: string) {
  try {
    const isGuest = !username || !password;
    const payload = isGuest ? {} : { username, password };
    console.log('registerAccount payload:', payload);
    const response = await server.post('/account/create', payload);
    console.log('response:', response);
    if (response.status !== 200) return response.data;
    await fetchMyAccount();
    return null;
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await server.post('/account/login', {
      username,
      password
    });

    if (response.data.refreshToken) {
      useTokenStore().storeRefreshToken(response.data.refreshToken);
      useTokenStore().accessToken = response.data.accessToken;
      await fetchMyAccount();
    }

    return response.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function fetchMyAccount() {
  try {
    const response = await server.get('/account/me');
    if (!response.data) return null;
    useUserStore().id = response.data.id;
    useUserStore().username = response.data.username;
    useUserStore().isGuest = response.data.isGuest;
    return response.data;
  } catch {
    return null;
  }
}

export async function logout() {
  useTokenStore().clear();
  useUserStore().clear();
  // Force the router to redirect from a 'null' page to the home page
  router.push('/');
}

export async function deleteAccount(password: string) {
  // Delete account logic
}

export async function changePassword(password: string, newPassword: string) {
  // Change password logic
}
