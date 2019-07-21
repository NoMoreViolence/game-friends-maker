import swal, { SweetAlertType } from 'sweetalert2';
import { Lang } from '@models';

export interface CommonAlertInfo {
  type: SweetAlertType;
  title: string;
  text: string;
}

export interface AfterAlert {
  resolve(): void;
  reject(): void;
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
