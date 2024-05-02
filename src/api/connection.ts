import axios from 'axios';
import { useTokenStore } from '../stores/token-store';
import router from '@/router';

const BASE_URL =
  location.hostname === 'localhost'
    ? 'http://localhost:3005'
    : 'https://xxxx-xxxx-production.up.railway.app/'; // Replace with the production URL

export const server = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function initializeConnection() {
  addInterceptors();
}

export function addInterceptors() {
  // Insert the access token into the Authorization header
  server.interceptors.request.use((config) => {
    if (!useTokenStore().accessToken) return config;
    //@ts-ignore
    if (!config) config = {};
    config!.headers!.Authorization = `Bearer ${useTokenStore().accessToken}`;
    return config;
  });

  // Handle 401 errors by fetching a new access token
  server.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const excludeUrls = ['/auth/token', '/auth/login', '/auth/register'];
      if (
        error.response?.status === 401 &&
        !excludeUrls.includes(error.config.url)
      ) {
        // If it's a 401 error on a fetchAccessToken request, it means the refresh token is invalid
        // Redirect the user to the login page
        if (error.config.url?.includes('/auth/token')) {
          useTokenStore().clear();
          router.push('/login');
          return Promise.reject('Invalid refresh token');
        }

        if (!useTokenStore().refreshToken)
          return Promise.reject(
            error.response?.data?.message || 'No refresh token found'
          );

        await fetchAccessToken();

        // After fetching the access token, retry the original request
        // This is done by returning the server call with the original config
        // Add the new access token to the Authorization header
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${
          useTokenStore().accessToken
        }`;
        return server(config);
      }

      return Promise.reject(error);
    }
  );
}

async function fetchAccessToken() {
  const response = await server.put('/auth/token', {
    refreshToken: useTokenStore().refreshToken
  });
  useTokenStore().accessToken = response.data.accessToken;
}
