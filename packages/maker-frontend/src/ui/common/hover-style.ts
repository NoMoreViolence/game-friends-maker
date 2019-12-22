import { css } from 'styled-components';
import { ColorCss } from './color';
import { BackgroundCss } from './background';
import { BorderCss } from './border';

export interface HoverStyleCss {
  hoverDisabled?: boolean;
  hoverColor?: ColorCss['color'];
  hoverBackgroundColor?: BackgroundCss['backgroundColor'];
  hoverBorderColor?: BorderCss['borderColor'];
  hoverBorderRadius?: BorderCss['borderRadius'];
  hoverBorderStyle?: BorderCss['borderStyle'];
  hoverBorderWidth?: BorderCss['borderWidth'];
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
        }
      `
      : ''}
`;
