import { css } from 'styled-components';
import { ColorCss } from './color';
import { BackgroundCss } from './background';
import { BorderCss } from './border';

export interface ActiveStyleCss {
  activeDisabled?: boolean;
  activeColor?: ColorCss['color'];
  activeBackgroundColor?: BackgroundCss['backgroundColor'];
  activeBorderColor?: BorderCss['borderColor'];
  activeBorderRadius?: BorderCss['borderRadius'];
  activeBorderStyle?: BorderCss['borderStyle'];
  activeBorderWidth?: BorderCss['borderWidth'];
}

export const activeStyleCss = css<ActiveStyleCss>`
  ${({
    activeDisabled,
    activeColor,
    activeBackgroundColor,
    activeBorderColor,
    activeBorderRadius,
    activeBorderStyle,
    activeBorderWidth,
  }) =>
    !activeDisabled
      ? `
        &:active {
          ${activeColor ? `color: ${activeColor};` : ''}
          ${activeBackgroundColor ? `backgroundColor: ${activeBackgroundColor};` : ''}
          ${activeBorderColor ? `border-color: ${activeBorderColor};` : ''}
          ${typeof activeBorderRadius === 'number' ? `border-radius: ${activeBorderRadius}px;` : ''}
          ${activeBorderStyle ? `border-style: ${activeBorderStyle};` : ''}
          ${typeof activeBorderWidth === 'number' ? `border-width: ${activeBorderWidth};` : ''}
        }
      `
      : ''}
`;
