import React, { FC } from 'react';
import styled from 'styled-components';

import { rowColBaseStyle, RowColProps } from './row-col-props';

export const Row: FC<RowColProps> = ({ isFlex = true, ...props }) => <RowDiv isFlex={isFlex} {...props} />;
const RowDiv = styled.div<RowColProps>`
  ${rowColBaseStyle};
  flex-direction: ${p => (p.isReversed ? 'row-reverse' : 'row')};
`;
