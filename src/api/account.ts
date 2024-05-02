import { useTokenStore } from '../stores/token-store';
import { server } from './connection';

export async function createAccount(username: string, password: string) {
  const response = await server.post('/account/create', {
    username,
    password
  });

  return response.data;
}

export async function login(username: string, password: string) {
  const response = await server.post('/account/login', {
    username,
    password
  });

  if (response.data.refreshToken) {
    useTokenStore().storeRefreshToken(response.data.refreshToken);
    useTokenStore().accessToken = response.data.accessToken;
  }

  return response.data;
}

export async function deleteAccount(password: string) {
  // Delete account logic
}

export async function changePassword(password: string, newPassword: string) {
  // Change password logic
}
