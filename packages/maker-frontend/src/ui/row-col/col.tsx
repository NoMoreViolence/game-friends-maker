import React, { FC } from 'react';
import styled from 'styled-components';

import { rowColBaseStyle, RowColProps } from './row-col-props';

export const Col: FC<RowColProps> = ({ isFlex = true, ...props }) => <ColDiv isFlex={isFlex} {...props} />;
const ColDiv = styled.div<RowColProps>`
  ${rowColBaseStyle}
  flex-direction: ${p => (p.isReversed ? 'column-reverse' : 'column')};
`;
