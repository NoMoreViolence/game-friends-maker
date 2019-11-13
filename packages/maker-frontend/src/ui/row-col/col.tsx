import React, { FC } from 'react';
import styled from 'styled-components';

import { rowColBaseStyle, RowColProps } from './row-col-props';

export const Col: FC<RowColProps> = props => <ColDiv {...props} />;
const ColDiv = styled.div<RowColProps>`
  display: flex;
  flex-direction: ${p => (p.isReversed ? 'column-reverse' : 'column')};
  ${rowColBaseStyle}
`;
