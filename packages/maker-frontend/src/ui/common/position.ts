import { css } from 'styled-components';

export interface PositionCss {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  position?: 'absolute' | 'relative' | 'fixed' | 'unset';
}

export const positionCss = css<PositionCss>`
  ${({ top }) => (typeof top === 'number' ? `top: ${top}px;` : '')}
  ${({ right }) => (typeof right === 'number' ? `right: ${right}px;` : '')}
  ${({ bottom }) => (typeof bottom === 'number' ? `bottom: ${bottom}px;` : '')}
  ${({ left }) => (typeof left === 'number' ? `left: ${left}px;` : '')}
  ${({ position }) => (position ? `position: ${position};` : '')}
`;
