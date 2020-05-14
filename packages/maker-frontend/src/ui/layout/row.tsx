import React, { FC } from 'react';
import styled from 'styled-components';

import { rowColBaseStyle, RowColProps } from './interface';

export const Row: FC<RowColProps> = ({ justifyContent = 'center', ...props }) => (
  <StyledDiv justifyContent={justifyContent} {...props} />
);

const StyledDiv = styled.div<RowColProps>`
  ${rowColBaseStyle};
  flex-direction: ${p => (p.isReversed ? 'row-reverse' : 'row')};
`;
