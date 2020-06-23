import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';
import { Colors } from 'ui/Colors';
import { Headline3 } from 'ui/Typo';
import { buttonCommonTheme } from './Theme';

interface Props extends MarginProps, HTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const UnderlineTextButton: FC<Props> = ({ text, ...props }) => (
  <StyledUnderlineTextButton {...props}>
    <Headline3 color={Colors.black} textDecoration="underline">
      {text}
    </Headline3>
  </StyledUnderlineTextButton>
);

const StyledUnderlineTextButton = styled.button`
  ${buttonCommonTheme}
  ${margin}
  border: none;
  height: 26px;
  padding-right: 4px;
  padding-left: 4px;
  background-color: ${Colors.white};

  &:hover {
    background-color: ${Colors.grayScale[100]};
  }
  &:active {
    background-color: ${Colors.grayScale[300]};
  }
`;
