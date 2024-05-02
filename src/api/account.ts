import router from '@/router';
import { useTokenStore } from '../stores/token-store';
import { useUserStore } from '../stores/user-store';
import { server } from './connection';

export async function createAccount(username: string, password: string) {
  try {
    const response = await server.post('/account/create', {
      username,
      password
    });
    return response.data;
  } catch {
    return null;
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
    }

    return response.data;
  } catch {
    return null;
  }
}

export async function fetchMyAccount() {
  try {
    const response = await server.get('/account/me');
    if (!response.data) return null;
    useUserStore().id = response.data.id;
    useUserStore().username = response.data.username;
    return response.data;
  } catch {
    return null;
  }
}

export async function logout() {
  useTokenStore().clear();
  useUserStore().clear();
  router.push('/login');
}

export async function deleteAccount(password: string) {
  // Delete account logic
}

export async function changePassword(password: string, newPassword: string) {
  // Change password logic
}
