import { useUserStore } from '@/stores/user-store';
import { HttpStatusCode } from 'axios';
import { server } from './connection';

export async function createNewGame(gameName: string, coverImage: string) {
  try {
    const response = await server.post('/games/new', {
      gameName,
      coverImage
    });
    if (response.status === HttpStatusCode.Ok) {
      console.log(response.data);
      useUserStore().games = response.data;
      return null;
    }
  } catch (error: any) {
    return error.response.data;
  }
}
