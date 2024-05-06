import { useUserStore } from '@/stores/user-store';
import { HttpStatusCode } from 'axios';
import { server } from './connection';

export async function createNewGame() {
  try {
    const response = await server.post('/games/new');
    if (response.status === HttpStatusCode.Ok) {
      console.log(response.data);
      useUserStore().games = response.data;
      return null;
    }
  } catch (error: any) {
    return error.response.data;
  }
}
