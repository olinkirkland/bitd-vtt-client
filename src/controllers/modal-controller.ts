import { Subject } from 'rxjs';
import { ComponentOptions } from 'vue';

export interface ModalConfig {
  closeOnClick?: boolean;
  headerText?: string;
  headerCloseButton?: boolean;
  variationClassName?: string;
}

export interface ModalDispatch {
  modal: ComponentOptions | null; // null means close
  modalConfig?: ModalConfig;
}

export default class ModalController {
  private static instance: ModalController | null = null;
  private subject: Subject<ModalDispatch> = new Subject<ModalDispatch>();

  private constructor() {}

  public static getInstance(): ModalController {
    return this.instance || (this.instance = new this());
  }

  private dispatch(d: ModalDispatch): void {
    this.subject.next(d);
  }

  public static open(
    modal: ComponentOptions<any>,
    modalConfig?: ModalConfig
  ): void {
    this.getInstance().dispatch({ modal, modalConfig });
  }

  public static close(callback?: Function): void {
    this.getInstance().dispatch({ modal: null });
    if (callback) callback();
  }

  public addEventListener(callback: (d: ModalDispatch) => void): void {
    this.subject.subscribe(callback);
  }

  public removeEventListener(): void {
    this.subject.unsubscribe();
  }
}
