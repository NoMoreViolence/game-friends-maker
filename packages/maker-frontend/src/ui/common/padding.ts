import { css } from 'styled-components';

export interface PaddingCss {
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  padding?: number; // global;
}
export const paddingCss = css<PaddingCss>`
  ${({ padding }) => (padding ? `padding: ${padding}px;` : '')}
  ${({ pt }) => (pt ? `padding-top: ${pt}px;` : '')}
  ${({ pb }) => (pb ? `padding-bottom: ${pb}px;` : '')}
  ${({ pr }) => (pr ? `padding-right: ${pr}px;` : '')}
  ${({ pl }) => (pl ? `padding-left: ${pl}px;` : '')}
`;
