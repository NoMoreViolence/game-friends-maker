import { HTMLAttributes } from 'react';
import { css } from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  height,
  HeightProps,
  margin,
  MarginProps,
  maxWidth,
  MaxWidthProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
  typography,
  TypographyProps,
  width,
  WidthProps,
} from 'styled-system';
import { cursor, CursorProps } from 'ui/System';

export interface TextStyleProps
  extends MarginProps,
    PaddingProps,
    BorderProps,
    FlexboxProps,
    TypographyProps,
    PositionProps,
    WidthProps,
    MaxWidthProps,
    HeightProps,
    BackgroundProps,
    DisplayProps,
    CursorProps,
    HTMLAttributes<HTMLSpanElement> {
  isEllipsisEnabled?: boolean; // false
  /**
   * @props 'none' | 'line-through' | 'overline' | 'underline' | 'initial' | 'inherit'
   */
  textDecoration?: string;
}
const textBaseStyle = css<TextStyleProps>`
  ${margin}
  ${border}
  ${padding}
  ${color}
  ${flexbox}
  ${typography}
  ${position}
  ${width}
  ${maxWidth}
  ${height}
  ${background}
  ${display}
  ${({ isEllipsisEnabled = false }) =>
    isEllipsisEnabled
      ? `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `
      : ''}
  text-decoration: ${({ textDecoration = 'none' }) => textDecoration};
  ${cursor}
`;
export const fontSizes = {
  headline1: 24,
  headline2: 20,
  headline3: 18,
  subtitle: 16,
  body1: 14,
  body2: 12,
  caption: 10,
  button: 14,
  buttonBig: 18,
};

const headline1 = css<TextStyleProps>`
  font-size: ${fontSizes.headline1}px;
  font-weight: bold;
  line-height: 36px;
  ${textBaseStyle}
`;
const headline2 = css<TextStyleProps>`
  font-size: ${fontSizes.headline2}px;
  font-weight: bold;
  line-height: 30px;
  ${textBaseStyle}
`;
const headline3 = css<TextStyleProps>`
  font-size: ${fontSizes.headline3}px;
  font-weight: normal;
  line-height: 26px;
  ${textBaseStyle}
`;
const subtitle = css<TextStyleProps>`
  font-size: ${fontSizes.subtitle}px;
  font-weight: bold;
  line-height: 24px;
  ${textBaseStyle}
`;
const body1 = css<TextStyleProps>`
  font-size: ${fontSizes.body1}px;
  font-weight: normal;
  line-height: 20px;
  ${textBaseStyle}
`;
const body2 = css<TextStyleProps>`
  font-size: ${fontSizes.body2}px;
  font-weight: normal;
  line-height: 18px;
  ${textBaseStyle}
`;
const caption = css<TextStyleProps>`
  font-size: ${fontSizes.caption}px;
  font-weight: bold;
  line-height: 14px;
  ${textBaseStyle}
`;

const button = css<TextStyleProps>`
  font-size: ${fontSizes.button}px;
  font-weight: bold;
  line-height: 20px;
  ${textBaseStyle}
`;
const buttonBig = css<TextStyleProps>`
  font-size: ${fontSizes.buttonBig}px;
  font-weight: bold;
  line-height: 26px;
  ${textBaseStyle}
`;

const signt = css<TextStyleProps>`
  font-size: 55px;
  font-weight: bold;
  line-height: 67px;
  ${textBaseStyle}
`;
const appHead = css<TextStyleProps>`
  font-size: 40px;
  font-weight: bold;
  line-height: 49px;
  ${textBaseStyle}
`;
const chartNum = css<TextStyleProps>`
  font-size: 36px;
  font-weight: bold;
  line-height: 44px;
  ${textBaseStyle}
`;

const custom = css<TextStyleProps>`
  ${textBaseStyle}
`;

export const TextStyles = {
  headline1,
  headline2,
  headline3,
  subtitle,
  body1,
  body2,
  caption,
  custom,
  button,
  buttonBig,
  signt,
  appHead,
  chartNum,
};

export type TypoType = keyof typeof TextStyles;
