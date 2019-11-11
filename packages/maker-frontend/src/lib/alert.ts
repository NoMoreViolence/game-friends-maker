import Swal, { SweetAlertIcon } from 'sweetalert2';

export const alert = (type: SweetAlertIcon, title: string, text: string, isTimer: boolean) => {
  Swal.fire({
    toast: false,
    position: 'center',
    title,
    text,
    icon: type,
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

export const toast = (type: SweetAlertIcon, title: string, text: string) =>
  Swal.fire({
    toast: true,
    position: 'top-right',
    title,
    text,
    icon: type,
    showConfirmButton: false,
    timer: 1500,
  });
