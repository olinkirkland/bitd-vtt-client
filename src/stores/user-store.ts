import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const id = ref();
  const username = ref();
  const clear = () => {
    id.value = null;
    username.value = null;
  };

  return {
    id,
    username,
    clear
  };
});
