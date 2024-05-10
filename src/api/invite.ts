import axios, { HttpStatusCode } from 'axios';
import { server } from './connection';
import ModalController from '@/controllers/modal-controller';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { useUserStore } from '@/stores/user-store';
import { router } from '@/router';
import GamePreviewModal from '@/components/modals/modal-content/GamePreviewModal.vue';

export async function acceptInvite(code: string) {
  ModalController.open(LoadingModal);
  const response = await server.post(`/invite/${code}`);
  if (response.status === HttpStatusCode.Ok) {
    useUserStore().games = response.data.games;
    const gameId = response.data.gameId;
    // Redirect to the games page
    router.push('/games');
  }
  ModalController.close();
}
