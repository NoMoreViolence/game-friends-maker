import React, { memo } from 'react';
import GlobalAlertComponent from '@src/containers/global/components/global-alert';
import GlobalLoadingComponent from '@src/containers/global/components/global-loading';

const _GlobalComponent = () => (
  <>
    <GlobalLoadingComponent />
    <GlobalAlertComponent />
  </>
);
const GlobalComponent = memo(_GlobalComponent);

export default GlobalComponent;
