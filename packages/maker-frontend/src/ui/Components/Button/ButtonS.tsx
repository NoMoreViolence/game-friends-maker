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
export const ButtonS: FC<Props> = ({ text, iconName, theme, ...props }) => {
  const themeColor = colorSelector(theme);

  return (
    <StyledButtonS theme={theme} {...props}>
      <ButtonText>{text}</ButtonText>
      {iconName && <Icon ml="8px" size={16} fillColor={themeColor} iconName={iconName} />}
    </StyledButtonS>
  );
};

const StyledButtonS = styled.button<Props>`
  ${margin}
  ${themeSelector}
  min-width: 72px;
  height: 32px;
  padding-right: 16px;
  padding-left: 16px;
`;
