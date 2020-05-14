import React, { FC } from 'react';
import { MarginProps, BackgroundProps, BorderProps, background, border, margin } from 'styled-system';
import styled from 'styled-components';

export interface CircleProps extends MarginProps, BackgroundProps {
  size: number;
  borderColor?: BorderProps['borderColor'];
  borderStyle?: BorderProps['borderStyle'];
  borderWidth?: BorderProps['borderWidth'];
}
export const Circle: FC<CircleProps> = ({
  size,
  mt,
  mb,
  mr,
  ml,
  background,
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
    background={background}
    borderColor={borderColor}
    borderStyle={borderStyle}
    borderWidth={borderWidth}
  >
    {children}
  </StyledCircle>
);
const StyledCircle = styled.div<CircleProps>`
  ${margin}
  ${border}
  ${background}
  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
  `}
  display: flex;
  justify-content: center;
  align-items: center;
`;
