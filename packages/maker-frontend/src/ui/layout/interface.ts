import { CSSProperties, HTMLAttributes } from 'react';
import { css } from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  flexbox,
  FlexboxProps,
  height,
  HeightProps,
  margin,
  MarginProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  minHeight,
  MinHeightProps,
  minWidth,
  MinWidthProps,
  overflow,
  OverflowProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
  width,
  WidthProps,
} from 'styled-system';

interface CursorProps {
  cursor?: 'pointer' | 'auto' | 'none' | 'not-allowed';
}
const cursor = css<CursorProps>`
  cursor: ${({ cursor = 'auto' }) => cursor};
`;

export interface RowColProps
  extends MarginProps,
    PaddingProps,
    WidthProps,
    HeightProps,
    MinWidthProps,
    MinHeightProps,
    MaxWidthProps,
    MaxHeightProps,
    BackgroundProps,
    FlexboxProps,
    BorderProps,
    OverflowProps,
    PositionProps,
    CursorProps,
    HTMLAttributes<HTMLDivElement> {
  isReversed?: boolean;
  style?: CSSProperties;
}

export const rowColBaseStyle = css<RowColProps>`
  ${margin}
  ${padding}
  ${width}
  ${minWidth}
  ${maxWidth}
  ${height}
  ${minHeight}
  ${maxHeight}
  ${background}
  ${flexbox}
  ${border}
  ${overflow}
  ${position}
  ${cursor}
  display: flex;
`;
