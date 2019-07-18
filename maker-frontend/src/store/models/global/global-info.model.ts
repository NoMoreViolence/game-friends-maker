import { SweetAlertType } from 'sweetalert2';
import { Lang } from '@models';

export interface CommonAlertInfo {
  type: SweetAlertType;
  title: string;
  text: string;
}

export type AlertInfo = CommonAlertInfo &
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
