import React, { memo } from 'react';
import GlobalAlertComponent from '@containers/global/components/global-alert';
import GlobalLoadingComponent from '@containers/global/components/global-loading';
import GlobalSignComponent from '@containers/global/components/global-sign';

const _GlobalComponent = () => (
  <>
    <GlobalSignComponent />
    <GlobalLoadingComponent />
    <GlobalAlertComponent />
  </>
);
const GlobalComponent = memo(_GlobalComponent);

export default GlobalComponent;
