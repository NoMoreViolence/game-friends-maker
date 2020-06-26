import styled from 'styled-components';
import { cursor, transform } from 'ui/System';
import { rowColBaseStyle, RowColProps } from './Interface';

export const Row = styled.div<RowColProps>`
  ${rowColBaseStyle};
  ${cursor}
  ${transform}
  flex-direction: ${(p) => (p.isReversed ? 'row-reverse' : 'row')};
`;
