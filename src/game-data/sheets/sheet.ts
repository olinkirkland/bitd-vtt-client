import { useUserStore } from '@/stores/user-store';

export default class Sheet {
  id: string;
  sheetType: string;
  createdBy: string; // The id of the player who created the sheet
  createdAt: number; // The timestamp of when the sheet was created

  constructor() {
    this.id = Math.random().toString(36).substr(2, 9);
    this.sheetType = 'sheet';
    this.createdBy = useUserStore().id;
    this.createdAt = Date.now();
  }
}
