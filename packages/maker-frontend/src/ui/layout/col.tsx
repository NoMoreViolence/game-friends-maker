import React, { FC } from 'react';
import styled from 'styled-components';
import { rowColBaseStyle, RowColProps } from './interface';

export const Col: FC<RowColProps> = ({ alignItems = 'center', ...props }) => (
  <StyledDiv alignItems={alignItems} {...props} />
);

const StyledDiv = styled.div<RowColProps>`
  ${rowColBaseStyle};
  flex-direction: ${p => (p.isReversed ? 'column-reverse' : 'column')};
`;
