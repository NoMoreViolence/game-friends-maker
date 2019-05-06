import React, { FC } from 'react';
import styled from 'styled-components';
import { SelfBuildingSquareSpinner } from 'react-epic-spinners';
import './loading.util.scss';

export const LoadingUtil: FC = () => (
  <div className="full-screen-modal">
    <SelfBuildingSquareSpinner color="#f06292" size={64} animationDuration={1500} />
  </div>
);
