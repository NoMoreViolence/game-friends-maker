import styled from 'styled-components';
import { cursor, CursorProps } from 'ui/System';
import { rowColBaseStyle, RowColProps } from './Interface';

interface Props extends RowColProps, CursorProps {}
export const Row = styled.div<Props>`
  flex-direction: ${(p) => (p.isReversed ? 'row-reverse' : 'row')};
  ${rowColBaseStyle};
  ${cursor}
`;
