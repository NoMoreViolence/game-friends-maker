import { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
} from 'styled-system';

export interface RowColProps
  extends MarginProps,
    BorderProps,
    PaddingProps,
    LayoutProps,
    FlexboxProps,
    BackgroundProps,
    ShadowProps,
    PositionProps,
    HTMLAttributes<HTMLDivElement> {
  isReversed?: boolean;
  style?: CSSProperties;
}

export const rowColBaseStyle = css<RowColProps>`
  ${margin}
  ${border}
  ${padding}
  ${layout}
  ${flexbox}
  ${background}
  ${shadow}
  ${position}
  display: flex;
`;
