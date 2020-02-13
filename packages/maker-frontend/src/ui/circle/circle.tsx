import React, { FC } from 'react';
import {
  MarginCss,
  marginCss,
  PointerCss,
  pointerCss,
  BackgroundCss,
  backgroundCss,
  BorderCss,
  borderCss,
} from 'ui/common';
import styled from 'styled-components';

export interface CircleProps extends MarginCss, PointerCss, BackgroundCss {
  size: number;
  borderColor?: BorderCss['borderColor'];
  borderStyle?: BorderCss['borderStyle'];
  borderWidth?: BorderCss['borderWidth'];
}
export const Circle: FC<CircleProps> = ({
  size,
  mt,
  mb,
  mr,
  ml,
  backgroundColor,
  borderColor,
  borderStyle,
  borderWidth,
  children,
}) => (
  <StyledCircle
    size={size}
    mt={mt}
    mb={mb}
    mr={mr}
    ml={ml}
    backgroundColor={backgroundColor}
    borderColor={borderColor}
    borderStyle={borderStyle}
    borderWidth={borderWidth}
  >
    {children}
  </StyledCircle>
);
const StyledCircle = styled.div<CircleProps>`
  ${marginCss}
  ${borderCss}
  ${pointerCss}
  ${backgroundCss}
  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;
