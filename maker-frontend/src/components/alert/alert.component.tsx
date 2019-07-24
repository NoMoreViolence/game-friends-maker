import React, { useEffect, memo } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AlertInfo, IntlProps } from '@models';

const Swal = withReactContent(swal);

type Props = AlertInfo & IntlProps;

const _AlertComponent = (props: Props) => {
  useEffect(() => {
    if (props.showConfirmButton === true) {
      Swal.fire({
        type: props.type,
        title: props.formatMessage({ id: props.title }),
        text: props.formatMessage({ id: props.text }),
        showConfirmButton: true,
        showCloseButton: true,
        allowOutsideClick: false,
        confirmButtonText: props.formatMessage({ id: props.confirmText }),
      });
    } else {
      Swal.fire({
        type: props.type,
        title: props.formatMessage({ id: props.title }),
        text: props.formatMessage({ id: props.text }),
        timer: 1500,
        showConfirmButton: false,
        showCancelButton: false,
      });
    }
  }, []);
  return <></>;
};
const AlertComponent = memo(_AlertComponent, (prevProps, nextProps) => false);

export default AlertComponent;
