import React, { FC, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  display,
  DisplayProps,
  margin,
  MarginProps,
  maxHeight,
  MaxHeightProps,
  maxWidth,
  MaxWidthProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
} from 'styled-system';
import { cursor, CursorProps } from 'ui/System';

interface Props
  extends ImgHTMLAttributes<HTMLImageElement>,
    DisplayProps,
    CursorProps,
    PositionProps,
    MarginProps,
    BorderProps,
    PaddingProps,
    BackgroundProps,
    MaxWidthProps,
    MaxHeightProps {
  isRotate?: boolean;
}
export const Img: FC<Props> = (props) => <StyledImg {...props} />;

const StyledImg = styled.img<Props>`
  ${display}
  ${maxWidth}
  ${maxHeight}
  ${cursor}
  ${position}
  ${margin}
  ${border}
  ${padding}
  ${background}
  ${({ isRotate }) => {
    if (isRotate) {
      return `
        transform: rotate(720deg);
        transition-duration: 1s;
        transition-delay: now;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      `;
    }
    return ``;
  }}
`;
