import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const id = ref();
  const username = ref();
  const isGuest = ref(true);

  const clear = () => {
    id.value = null;
    username.value = null;
    isGuest.value = true;
  };

  return {
    id,
    username,
    isGuest,
    clear
  };
});
