import { css } from 'styled-components';

export interface CursorProps {
  cursor?: 'pointer' | 'auto' | 'none' | 'not-allowed';
}
export const cursor = css<CursorProps>`
  ${({ cursor }) => {
    if (cursor) {
      return `cursor: ${cursor};`;
    }
    return '';
  }}
`;
