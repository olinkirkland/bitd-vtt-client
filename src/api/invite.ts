import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import ModalController from '@/controllers/modal-controller';
import { PageName, router } from '@/router';
import { useUserStore } from '@/stores/user-store';
import { HttpStatusCode } from 'axios';
import { server } from './connection';

export async function acceptInvite(code: string) {
  ModalController.open(LoadingModal);
  const response = await server.post(`/invite/${code}`);
  console.log(response);
  if (response.status === HttpStatusCode.Ok) {
    useUserStore().games = response.data.games;
    const gameId = response.data.gameId;
    // Redirect to the game's page
    router.push({ name: PageName.GAME, params: { id: gameId } });
  }
  ModalController.close();
}
