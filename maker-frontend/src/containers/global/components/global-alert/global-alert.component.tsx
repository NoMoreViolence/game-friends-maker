import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useIntl } from 'react-intl';
import { AppState } from '@bootstrap';
import { getAlertsSelector, getToastsSelector } from '@reducers';
import AlertComponent from '@components/alert';
import ToastComponent from '@components/toast';

const _GlobalAlertComponent = () => {
  const { formatMessage } = useIntl();
  const alerts = useSelector((state: AppState) => getAlertsSelector(state.global), shallowEqual);
  const toasts = useSelector((state: AppState) => getToastsSelector(state.global), shallowEqual);

  return (
    <>
      {alerts.map((alert, key) => (
        <AlertComponent {...alert} formatMessage={formatMessage} key={key} />
      ))}
      {toasts.map((toast, key) => (
        <ToastComponent {...toast} formatMessage={formatMessage} key={key} />
      ))}
    </>
  );
};
const GlobalAlertComponent = memo(_GlobalAlertComponent);

export default GlobalAlertComponent;
