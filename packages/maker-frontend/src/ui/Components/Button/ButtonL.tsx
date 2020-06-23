import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';
import { Colors } from 'ui/Colors';
import { ButtonText } from 'ui/Typo';
import { Icon, IconName } from '../Icons';
import { buttonTheme } from './Theme';

interface Props extends MarginProps, ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  iconName?: IconName;
}
export const ButtonL: FC<Props> = ({ text, iconName, ...props }) => (
  <StyledButtonL {...props}>
    <ButtonText>{text}</ButtonText>
    {iconName && <Icon ml="8px" size={16} fillColor={Colors.white} iconName={iconName} />}
  </StyledButtonL>
);

const StyledButtonL = styled.button<Props>`
  ${margin}
  ${buttonTheme.primary}
  min-width: 80px;
  height: 48px;
  padding-right: 24px;
  padding-left: 24px;
`;
