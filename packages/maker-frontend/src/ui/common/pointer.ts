import { css } from 'styled-components';

export interface PointerCss {
  pointer?: boolean;
}

export const pointerCss = css<PointerCss>`
  ${({ pointer }) => (pointer ? `cursor: pointer;` : '')}
`;
