import { css } from 'styled-components';
import { ColorCss } from './color';
import { BackgroundCss } from './background';
import { BorderCss } from './border';

export interface FocusStyleCss {
  focusDisabled?: boolean;
  focusColor?: ColorCss['color'];
  focusBackgroundColor?: BackgroundCss['backgroundColor'];
  focusBorderColor?: BorderCss['borderColor'];
  focusBorderRadius?: BorderCss['borderRadius'];
  focusBorderStyle?: BorderCss['borderStyle'];
  focusBorderWidth?: BorderCss['borderWidth'];
}

export const focusStyleCss = css<FocusStyleCss>`
  ${({
    focusDisabled,
    focusColor,
    focusBackgroundColor,
    focusBorderColor,
    focusBorderRadius,
    focusBorderStyle,
    focusBorderWidth,
  }) =>
    !focusDisabled
      ? `
        &:focus {
          ${focusColor ? `color: ${focusColor};` : ''}
          ${focusBackgroundColor ? `backgroundColor: ${focusBackgroundColor};` : ''}
          ${focusBorderColor ? `border-color: ${focusBorderColor};` : ''}
          ${typeof focusBorderRadius === 'number' ? `border-radius: ${focusBorderRadius}px;` : ''}
          ${focusBorderStyle ? `border-style: ${focusBorderStyle};` : ''}
          ${typeof focusBorderWidth === 'number' ? `border-width: ${focusBorderWidth};` : ''}
        }
      `
      : ''}
`;
