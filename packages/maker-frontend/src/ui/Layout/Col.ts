import styled from 'styled-components';
import { cursor, transform } from 'ui/System';
import { rowColBaseStyle, RowColProps } from './Interface';

export const Col = styled.div<RowColProps>`
  ${rowColBaseStyle};
  ${cursor}
  ${transform}
  flex-direction: ${(p) => (p.isReversed ? 'column-reverse' : 'column')};
`;
