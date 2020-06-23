import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { margin } from 'styled-system';
import { Row } from 'ui/Layout';
import { ButtonTextBig } from 'ui/Typo';
import { Img } from '../Img';
import { ButtonStyleProps, buttonTheme } from './Theme';

interface Props extends ButtonStyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'primary' | 'white';
  text?: string;
  leftImgSrc?: string;
  rightImgSrc?: string;
}
export const ButtonWide: FC<Props> = ({ text, leftImgSrc, rightImgSrc, ...props }) => (
  <StyledButtonWide {...props}>
    <Row>{leftImgSrc && <Img src={leftImgSrc} />}</Row>
    <ButtonTextBig>{text}</ButtonTextBig>
    <Row>{rightImgSrc && <Img src={rightImgSrc} />}</Row>
  </StyledButtonWide>
);

const StyledButtonWide = styled.button<Props>`
  ${margin}
  ${({ theme }) => (theme === 'primary' ? buttonTheme.primary : buttonTheme.wideWhite)};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  height: 64px;
  padding-right: 16px;
  padding-left: 16px;
`;
