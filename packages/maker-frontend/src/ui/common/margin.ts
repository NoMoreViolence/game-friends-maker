import { css } from 'styled-components';

export interface MarginCss {
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}
export const marginCss = css<MarginCss>`
  ${({ mt }) => (mt ? `margin-top: ${mt}px;` : '')}
  ${({ mb }) => (mb ? `margin-bottom: ${mb}px;` : '')}
  ${({ mr }) => (mr ? `margin-right: ${mr}px;` : '')}
  ${({ ml }) => (ml ? `margin-left: ${ml}px;` : '')}
`;
