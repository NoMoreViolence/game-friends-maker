import React, { useEffect, memo } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ToastInfo, IntlProps } from '@models';

const Swal = withReactContent(swal);

type Props = ToastInfo & IntlProps;

const _ToastComponent = ({ type, title, text, formatMessage }: Props) => {
  useEffect(() => {
    Swal.fire({
      type,
      title: formatMessage({ id: title }),
      text: formatMessage({ id: text }),
      timer: 3000,
      toast: true,
      position: 'top-right',
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false,
      showLoaderOnConfirm: false,
    });
  }, []);
  return <></>;
};
const ToastComponent = memo(_ToastComponent, (prevProps, nextProps) => false);

export default ToastComponent;
