import React, { useEffect, memo } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ToastInfo, IntlProps } from 'store/models';
import { isArray } from 'util';

const Swal = withReactContent(swal);

type Props = ToastInfo & IntlProps;

const _ToastComponent = ({ type, title, text, formatMessage }: Props) => {
  useEffect(() => {
    Swal.fire({
      icon: type,
      title: formatMessage(
        {
          id: isArray(title) ? title[0].id : title,
        },
        {
          ...(isArray(title) ? { ...title[1] } : {}),
        },
      ),
      text: formatMessage(
        {
          id: isArray(text) ? text[0].id : text,
        },
        {
          ...(isArray(text) ? { ...text[1] } : {}),
        },
      ),
      timer: 3000,
      toast: true,
      position: 'top-right',
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false,
      showLoaderOnConfirm: false,
    });
  }, [formatMessage, text, title, type]);
  return <></>;
};
const ToastComponent = memo(_ToastComponent, () => false);

export default ToastComponent;
