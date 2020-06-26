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
import { CursorProps, TransformProps } from 'ui/System';

export interface RowColBaseProps
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

export const rowColBaseStyle = css<RowColBaseProps>`
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

export interface RowColProps extends RowColBaseProps, CursorProps, TransformProps {}
