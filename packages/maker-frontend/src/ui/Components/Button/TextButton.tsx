import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';
import { Colors } from 'ui/Colors';
import { ButtonText } from 'ui/Typo';
import { buttonCommonTheme } from './Theme';

interface Props extends MarginProps, HTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const TextButton: FC<Props> = ({ text, ...props }) => (
  <StyledTextButton {...props}>
    <ButtonText color={Colors.primary}>{text}</ButtonText>
  </StyledTextButton>
);

const StyledTextButton = styled.button`
  ${buttonCommonTheme}
  ${margin}
  border: none;
  height: 32px;
  padding-right: 8px;
  padding-left: 8px;
  background-color: ${Colors.white};

  &:hover {
    background-color: ${Colors.grayScale[100]};
  }
  &:active {
    background-color: ${Colors.grayScale[300]};
  }
`;
