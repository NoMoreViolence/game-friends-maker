import { css, CSSProperties } from 'styled-components';
import {
  background,
  BackgroundProps,
  BorderProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  fontStyle,
  FontStyleProps,
  fontWeight,
  FontWeightProps,
  letterSpacing,
  LetterSpacingProps,
  lineHeight,
  LineHeightProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
  textAlign,
  TextAlignProps,
  zIndex,
  ZIndexProps,
} from 'styled-system';

export interface TypoProps
  extends MarginProps,
    PaddingProps,
    BorderProps,
    BackgroundProps,
    BoxShadowProps,
    ZIndexProps,
    PositionProps,
    ColorProps,
    FontStyleProps,
    FontWeightProps,
    LineHeightProps,
    LetterSpacingProps,
    TextAlignProps {
  flex?: number;
  display?: 'block' | 'flex' | 'none';
  textAlign?: 'left' | 'right' | 'center';
  letterSpacing?: number;
  fontStyle?: 'normal' | 'italic';
  isEllipsisEnabled?: boolean; // true
  style?: CSSProperties;
}
const typoProps = css<TypoProps>`
  ${margin}
  ${padding}
  ${background}
  ${boxShadow}
  ${zIndex}
  ${position}
  ${color}
  ${fontStyle}
  ${fontWeight}
  ${lineHeight}
  ${letterSpacing}
  ${textAlign}
  ${({ flex }) => (flex ? `flex: ${flex};` : '')}
  ${({ isEllipsisEnabled = true }) =>
    isEllipsisEnabled
      ? `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
      : ''}
`;

const pxCustom = css<TypoProps & FontFamilyProps & FontSizeProps>`
  ${typoProps}
  ${fontFamily}
  ${fontSize}
`;
const px36 = css<TypoProps>`
  font-size: 36px;
  ${typoProps}
`;
const px24 = css<TypoProps>`
  font-size: 24px;
  ${typoProps}
`;
const px18 = css<TypoProps>`
  font-size: 18px;
  ${typoProps}
`;
const px16 = css<TypoProps>`
  font-size: 16px;
  ${typoProps}
`;
const px14 = css<TypoProps>`
  font-size: 14px;
  ${typoProps}
`;
const px12 = css<TypoProps>`
  font-size: 12px;
  ${typoProps}
`;
const px10 = css<TypoProps>`
  font-size: 10px;
  ${typoProps}
`;

export const textStyles = {
  pxCustom,
  px36,
  px24,
  px18,
  px16,
  px14,
  px12,
  px10,
};
