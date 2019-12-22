import { css } from 'styled-components';

export interface BorderCss {
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
}
export const borderCss = css<BorderCss>`
  ${({ borderColor }) => (borderColor ? `border-color: ${borderColor};` : '')}
  ${({ borderWidth }) => (borderWidth ? `border-width: ${borderWidth}px;` : '')}
  ${({ borderRadius }) => (borderRadius ? `border-radius: ${borderRadius}px;` : '')}
  ${({ borderStyle }) => (borderStyle ? `border-style: ${borderStyle};` : '')}
`;
