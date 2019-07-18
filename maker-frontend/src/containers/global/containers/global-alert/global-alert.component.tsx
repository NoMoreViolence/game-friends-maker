import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import { AppState } from '@bootstrap';
import { getAlertsSelector, getToastssSelector } from '@src/store/reducers';
import AlertComponent from '@src/components/alert';
import ToastComponent from '@src/components/toast';

const GlobalAlertComponent = () => {
  const { formatMessage } = useIntl();
  const alerts = useSelector((state: AppState) => getAlertsSelector(state.global), shallowEqual);
  const toasts = useSelector((state: AppState) => getToastssSelector(state.global), shallowEqual);

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

export default GlobalAlertComponent;
