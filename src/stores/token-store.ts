import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTokenStore = defineStore('auth', () => {
  const refreshToken = ref();
  const accessToken = ref();

  // Retrieve refresh token from localStorage if it exists
  const storedRefreshToken = localStorage.getItem('refreshToken');
  if (storedRefreshToken) refreshToken.value = storedRefreshToken;

  // Watch for changes in refreshToken and store it in localStorage
  const storeRefreshToken = (newToken: string) => {
    refreshToken.value = newToken;
    if (!newToken) localStorage.removeItem('refreshToken');
    localStorage.setItem('refreshToken', newToken);
  };

  return {
    accessToken,
    refreshToken,
    storeRefreshToken
  };
});
