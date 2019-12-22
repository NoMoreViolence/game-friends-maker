import { css } from 'styled-components';

export interface TransitionCss {
  transition?: number;
}

export const transitionCss = css<TransitionCss>`
  ${({ transition }) => (typeof transition === 'number' ? `transition: ${transition}s;` : '')}
`;
