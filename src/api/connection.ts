import axios from 'axios';
import { useTokenStore } from '../stores/token-store';

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
  server.interceptors.request.use((config) => {
    if (!useTokenStore().accessToken) return config;
    //@ts-ignore
    if (!config) config = {};
    config!.headers!.Authorization = `Bearer ${useTokenStore().accessToken}`;
    return config;
  });

  server.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      if (error.response?.status === 403) {
        if (!useTokenStore().refreshToken)
          return Promise.reject(
            error.response?.data?.message || 'No refresh token found'
          );

        await fetchAccessToken();
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
  const response = await server.post('/account/refresh', {
    refreshToken: useTokenStore().refreshToken
  });

  useTokenStore().accessToken = response.data.accessToken;
}
