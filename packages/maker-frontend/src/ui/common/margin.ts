import { css } from 'styled-components';

export interface MarginCss {
  mt?: number | 'auto';
  mb?: number | 'auto';
  mr?: number | 'auto';
  ml?: number | 'auto';
}
export const marginCss = css<MarginCss>`
  ${({ mt }) => (typeof mt === 'number' ? `margin-top: ${mt}px;` : mt === 'auto' ? 'margin-top: auto;' : '')}
  ${({ mb }) => (typeof mb === 'number' ? `margin-bottom: ${mb}px;` : mb === 'auto' ? 'margin-bottom: auto;' : '')}
  ${({ mr }) => (typeof mr === 'number' ? `margin-right: ${mr}px;` : mr === 'auto' ? 'margin-right: auto;' : '')}
  ${({ ml }) => (typeof ml === 'number' ? `margin-left: ${ml}px;` : ml === 'auto' ? 'margin-left: auto;' : '')}
`;
