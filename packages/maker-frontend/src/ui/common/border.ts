import { css } from 'styled-components';

export interface BorderCss {
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  boxSizing?: 'border-box' | 'content-box';
  borderRightWidth?: number;
  borderLeftWidth?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
}
export const borderCss = css<BorderCss>`
  ${({ borderColor }) => (borderColor ? `border-color: ${borderColor};` : '')}
  ${({ borderWidth }) => (borderWidth ? `border-width: ${borderWidth}px;` : '')}
  ${({ borderRightWidth }) =>
    typeof borderRightWidth === 'number' ? `border-right-width: ${borderRightWidth}px;` : ''}
  ${({ borderLeftWidth }) => (typeof borderLeftWidth === 'number' ? `border-left-width: ${borderLeftWidth}px;` : '')}
  ${({ borderTopWidth }) => (typeof borderTopWidth === 'number' ? `border-top-width: ${borderTopWidth}px;` : '')}
  ${({ borderBottomWidth }) =>
    typeof borderBottomWidth === 'number' ? `border-bottom-width: ${borderBottomWidth}px;` : ''}
  ${({ borderRadius }) => (borderRadius ? `border-radius: ${borderRadius}px;` : '')}
  ${({ borderStyle }) => (borderStyle ? `border-style: ${borderStyle};` : '')}
  ${({ boxSizing }) => (boxSizing ? `box-sizing: ${boxSizing};` : '')}
`;
