import { useUserStore } from '@/stores/user-store';
import { HttpStatusCode } from 'axios';
import { server } from './connection';

export async function createNewGame(gameName: string, coverImage: string) {
  try {
    const response = await server.post('/game/new', {
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

export async function joinGameWithInvite(inviteCode: string) {
  try {
    const response = await server.post(`/game/join/${inviteCode}`);
    if (response.status === HttpStatusCode.Ok) {
      // TODO
      return null;
    }
  } catch (error: any) {
    return error.response.data;
  }
}