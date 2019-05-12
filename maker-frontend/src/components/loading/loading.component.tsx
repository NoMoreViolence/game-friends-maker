import React, { FC } from 'react';
import { ILoadingComponentProps, ILoadingComponentMethod } from '../../containers/loading/loading.container';
import { LoadingUtil } from '../../utils';

const LoadingComponent: FC<ILoadingComponentProps & ILoadingComponentMethod> = ({ pending }) => (
  <>{pending && <LoadingUtil />}</>
);

export default LoadingComponent;
