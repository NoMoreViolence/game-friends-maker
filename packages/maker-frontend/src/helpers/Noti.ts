import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const swal = withReactContent(Swal);

const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
interface ToastProps {
  icon: SweetAlertIcon;
  title: string;
}
export function toast(props: ToastProps) {
  return Toast.fire(props);
}

export function noti(props: SweetAlertOptions) {
  return swal.fire(props);
}
