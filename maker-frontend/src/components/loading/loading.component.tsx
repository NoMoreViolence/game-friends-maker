import React, { FC } from 'react';
import { LoadingComponentProps, LoadingComponentMethod } from '../../containers/loading/loading.container';
import { LoadingUtil } from '../../utils';

const LoadingComponent: FC<LoadingComponentProps & LoadingComponentMethod> = ({ pending }) => (
  <>{pending && <LoadingUtil />}</>
);

export default LoadingComponent;
