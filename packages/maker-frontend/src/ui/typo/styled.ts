import { LabelHTMLAttributes } from 'react';
import { css, CSSProperties } from 'styled-components';
import {
  BorderCss,
  BackgroundCss,
  BoxShadowCss,
  ZIndexCss,
  MarginCss,
  PaddingCss,
  marginCss,
  paddingCss,
  backgroundCss,
  boxShadowCss,
  zIndexCss,
  PositionCss,
  positionCss,
  colorCss,
  ColorCss,
  TransitionCss,
  transitionCss,
  HoverStyleCss,
  hoverStyleCss,
  PointerCss,
  pointerCss,
} from '../common';

export interface TypoCss
  extends MarginCss,
    PaddingCss,
    BorderCss,
    BackgroundCss,
    BoxShadowCss,
    ZIndexCss,
    PositionCss,
    ColorCss,
    PointerCss,
    TransitionCss,
    HoverStyleCss,
    LabelHTMLAttributes<HTMLLabelElement> {
  flex?: number;
  display?: 'block' | 'flex' | 'none';
  fontWeight?: number;
  textAlign?: 'left' | 'right' | 'center';
  letterSpacing?: number;
  fontStyle?: 'normal' | 'italic';
  isEllipsisEnabled?: boolean; // true
  style?: CSSProperties;
}
const typoCss = css<TypoCss>`
  ${marginCss}
  ${paddingCss}
  ${backgroundCss}
  ${boxShadowCss}
  ${zIndexCss}
  ${positionCss}
  ${colorCss}
  ${pointerCss}
  ${transitionCss}
  ${hoverStyleCss}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  ${({ textAlign }) => (textAlign ? `text-align: ${textAlign};` : '')}
  ${({ fontWeight }) => (fontWeight ? `font-weight: ${fontWeight};` : '')}
  ${({ letterSpacing }) => (letterSpacing ? `letter-spacing: ${letterSpacing}` : '')}
  ${({ fontStyle }) => (fontStyle ? `font-style: ${fontStyle};` : 'font-style: normal;')}
  ${({ isEllipsisEnabled = true }) =>
    isEllipsisEnabled
      ? `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
      : ''}
`;

const px36 = css<TypoCss>`
  font-size: 36px;
  ${typoCss}
`;
const px24 = css<TypoCss>`
  font-size: 24px;
  ${typoCss}
`;
const px18 = css<TypoCss>`
  font-size: 18px;
  ${typoCss}
`;
const px16 = css<TypoCss>`
  font-size: 16px;
  ${typoCss}
`;
const px14 = css<TypoCss>`
  font-size: 14px;
  ${typoCss}
`;
const px12 = css<TypoCss>`
  font-size: 12px;
  ${typoCss}
`;
const px10 = css<TypoCss>`
  font-size: 10px;
  ${typoCss}
`;

export const textStyles = {
  px36,
  px24,
  px18,
  px16,
  px14,
  px12,
  px10,
};
