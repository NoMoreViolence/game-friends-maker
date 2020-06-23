import React, { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { margin } from 'styled-system';
import { ButtonText } from 'ui/Typo';
import { Icon, IconName } from '../Icons';
import { ButtonStyleProps, colorSelector, themeSelector } from './Theme';

interface Props extends ButtonStyleProps, ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  iconName?: IconName;
}
export const ButtonXL: FC<Props> = ({ text, iconName, theme, ...props }) => {
  const themeColor = colorSelector(theme);

  return (
    <StyledButtonXL theme={theme} {...props}>
      <ButtonText>{text}</ButtonText>
      {iconName && <Icon ml="8px" size={16} fillColor={themeColor} iconName={iconName} />}
    </StyledButtonXL>
  );
};

const StyledButtonXL = styled.button<Props>`
  ${margin}
  ${themeSelector}
  min-width: 120px;
  height: 64px;
  padding-right: 32px;
  padding-left: 32px;
`;
