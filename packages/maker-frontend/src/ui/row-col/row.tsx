import React, { FC } from 'react';
import styled from 'styled-components';

import { rowColBaseStyle, RowColProps } from './row-col-props';

export const Row: FC<RowColProps> = props => <RowDiv {...props} />;
const RowDiv = styled.div<RowColProps>`
  display: flex;
  flex-direction: ${p => (p.isReversed ? 'row-reverse' : 'row')};
  ${rowColBaseStyle};
`;
