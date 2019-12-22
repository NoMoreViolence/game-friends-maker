import { css } from 'styled-components';

export interface BoxShadowCss {
  boxShadow?: string;
}

export const boxShadowCss = css<BoxShadowCss>`
  ${({ boxShadow }) => (boxShadow ? `box-shadow: ${boxShadow};` : '')}
`;
