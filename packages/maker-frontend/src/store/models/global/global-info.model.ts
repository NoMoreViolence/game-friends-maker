import { SweetAlertIcon } from 'sweetalert2';
import { Lang } from 'store/models';

export interface CommonAlertInfo {
  type: SweetAlertIcon;
  title: string | [{ id: string }, { [key: string]: string }];
  text: string | [{ id: string }, { [key: string]: string }];
}

export interface AfterAlert {
  resolve?(): void;
  reject?(): void;
}
export type AlertInfo = CommonAlertInfo &
  AfterAlert &
  (
    | ({
        showConfirmButton: true;
        confirmText: string;
      })
    | { showConfirmButton: false });
export interface ToastInfo extends CommonAlertInfo {}

export interface GlobalInfo {
  alerts: AlertInfo[];
  toasts: ToastInfo[];
  language: Lang;
}
