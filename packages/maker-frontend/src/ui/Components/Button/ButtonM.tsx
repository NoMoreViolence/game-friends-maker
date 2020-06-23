import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { margin } from 'styled-system';
import { ButtonText } from 'ui/Typo';
import { Icon, IconName } from '../Icons';
import { ButtonStyleProps, colorSelector, themeSelector } from './Theme';

interface Props extends ButtonStyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'primary' | 'primary-light' | 'red-light';
  text?: string;
  iconName?: IconName;
}
export const ButtonM: FC<Props> = ({ text, iconName, theme, ...props }) => {
  const themeColor = colorSelector(theme);

  return (
    <StyledButtonM theme={theme} {...props}>
      <ButtonText>{text}</ButtonText>
      {iconName && <Icon ml="8px" size={16} fillColor={themeColor} iconName={iconName} />}
    </StyledButtonM>
  );
};

const StyledButtonM = styled.button<Props>`
  ${margin}
  ${themeSelector}
  min-width: 160px;
  height: 40px;
  padding-right: 16px;
  padding-left: 16px;
`;
