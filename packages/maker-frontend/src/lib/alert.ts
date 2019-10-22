import Swal, { SweetAlertType } from 'sweetalert2';

export const alert = (type: SweetAlertType, title: string, text: string, isTimer: boolean) => {
  Swal.fire({
    toast: false,
    position: 'center',
    title,
    text,
    type,
    ...(isTimer
      ? {
          showConfirmButton: false,
          showCloseButton: false,
          showCancelButton: false,
          timer: 1500,
        }
      : {
          showConfirmButton: true,
          showCloseButton: true,
        }),
  });
};

export const toast = (type: SweetAlertType, title: string, text: string) =>
  Swal.fire({
    toast: true,
    position: 'top-right',
    title,
    text,
    type,
    showConfirmButton: false,
    timer: 1500,
  });
