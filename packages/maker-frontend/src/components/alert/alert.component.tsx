import React, { useEffect, memo } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AlertInfo, IntlProps } from 'store/models';
import { isArray } from 'util';

const Swal = withReactContent(swal);

type Props = AlertInfo & IntlProps;

const _AlertComponent = (props: Props) => {
  useEffect(() => {
    if (props.showConfirmButton === true) {
      Swal.fire({
        icon: props.type,
        title: props.formatMessage(
          { id: isArray(props.title) ? props.title[0].id : props.title },
          { ...(isArray(props.title) ? { ...props.title[1] } : {}) },
        ),
        text: props.formatMessage(
          { id: isArray(props.text) ? props.text[0].id : props.text },
          { ...(isArray(props.text) ? { ...props.text[1] } : {}) },
        ),
        showConfirmButton: true,
        showCloseButton: true,
        allowOutsideClick: false,
        confirmButtonText: props.formatMessage({ id: props.confirmText }),
        onClose: () => {},
      });
    } else {
      Swal.fire({
        icon: props.type,
        title: props.formatMessage(
          { id: isArray(props.title) ? props.title[0].id : props.title },
          { ...(isArray(props.title) ? { ...props.title[1] } : {}) },
        ),
        text: props.formatMessage(
          { id: isArray(props.text) ? props.text[0].id : props.text },
          { ...(isArray(props.text) ? { ...props.text[1] } : {}) },
        ),
        timer: 1500,
        showConfirmButton: false,
        showCancelButton: false,
        onClose: () => {},
      });
    }
  }, [props]);
  return <></>;
};
const AlertComponent = memo(_AlertComponent, () => false);

export default AlertComponent;
