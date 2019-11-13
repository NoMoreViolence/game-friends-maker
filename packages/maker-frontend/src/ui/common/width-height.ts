import { css } from 'styled-components';

export interface WidthHeightCss {
  width?: number;
  height?: number;
}
export const widthHeightCss = css<WidthHeightCss>`
  ${({ width }) => (width ? `width: ${width}px;` : '')}
  ${({ height }) => (height ? `height: ${height}px;` : '')}
`;
