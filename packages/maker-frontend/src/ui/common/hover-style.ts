import { css } from 'styled-components';
import { ColorCss } from './color';
import { BackgroundCss } from './background';
import { BorderCss } from './border';
import { BoxShadowCss } from './box-shadow';

export interface HoverStyleCss {
  hoverDisabled?: boolean;
  hoverColor?: ColorCss['color'];
  hoverBackgroundColor?: BackgroundCss['backgroundColor'];
  hoverBorderColor?: BorderCss['borderColor'];
  hoverBorderRadius?: BorderCss['borderRadius'];
  hoverBorderStyle?: BorderCss['borderStyle'];
  hoverBorderWidth?: BorderCss['borderWidth'];
  hoverBoxShadow?: BoxShadowCss['boxShadow'];
}

export const hoverStyleCss = css<HoverStyleCss>`
  ${({
    hoverDisabled,
    hoverColor,
    hoverBackgroundColor,
    hoverBorderColor,
    hoverBorderRadius,
    hoverBorderStyle,
    hoverBorderWidth,
    hoverBoxShadow,
  }) =>
    !hoverDisabled
      ? `
        &:hover {
          ${hoverColor ? `color: ${hoverColor};` : ''}
          ${hoverBackgroundColor ? `backgroundColor: ${hoverBackgroundColor};` : ''}
          ${hoverBorderColor ? `border-color: ${hoverBorderColor};` : ''}
          ${typeof hoverBorderRadius === 'number' ? `border-radius: ${hoverBorderRadius}px;` : ''}
          ${hoverBorderStyle ? `border-style: ${hoverBorderStyle};` : ''}
          ${typeof hoverBorderWidth === 'number' ? `border-width: ${hoverBorderWidth};` : ''}
          ${hoverBoxShadow ? `box-shadow: ${hoverBoxShadow};` : ''}
        }
      `
      : ''}
`;
