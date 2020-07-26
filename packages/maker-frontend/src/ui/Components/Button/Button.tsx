import { rgba } from 'polished';
import React, { ButtonHTMLAttributes, FC, memo } from 'react';
import styled from 'styled-components';
import {
  height,
  HeightProps,
  margin,
  MarginProps,
  minWidth,
  MinWidthProps,
  padding,
  PaddingProps,
  width,
  WidthProps,
} from 'styled-system';
import { Colors } from 'ui/Colors';
import { Icon, IconName } from 'ui/Components/Icons';
import { ButtonText } from 'ui/Typo';

const colorByButtonType = {
  primary: Colors.white,
  'primary-light': Colors.primary,
  danger: Colors.white,
  'danger-light': Colors.statusColors.error,
  gray: Colors.white,
  'gray-light': Colors.grayScale[900],
};

interface Props
  extends WidthProps,
    MinWidthProps,
    HeightProps,
    PaddingProps,
    MarginProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  buttonType: 'primary-light' | 'primary' | 'danger-light' | 'danger';
  size?: 'S' | 'M' | 'L' | 'XL';
  rightIconName?: IconName;
}
const ButtonUI: FC<Props> = ({ text, rightIconName, buttonType, ...props }) => {
  const color = colorByButtonType[buttonType];

  return (
    <StyledButton buttonType={buttonType} {...props}>
      <ButtonText color={color}>{text}</ButtonText>
      {rightIconName && <Icon ml="8px" iconName={rightIconName} size={16} fillColor={color} />}
    </StyledButton>
  );
};
export const Button = memo(ButtonUI);

interface StyledButtonProps
  extends WidthProps,
    MinWidthProps,
    HeightProps,
    PaddingProps,
    MarginProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: 'primary-light' | 'primary' | 'danger-light' | 'danger' | 'white';
  size?: 'S' | 'M' | 'L' | 'XL';
}
const StyledButton = styled.button<StyledButtonProps>`
  ${width}
  ${minWidth}
  ${height}
  ${margin}
  ${padding}
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ buttonType }) => {
    switch (buttonType) {
      case 'primary':
        return `
          background-color: ${Colors.primary};
          border: 1px solid ${Colors.primary};
          > span {
            color: ${Colors.white};
          }
          &:hover {
            background-color: ${Colors.primaryScale[600]};
            border-color: ${Colors.primaryScale[600]};
          }
          &:active {
            background-color: ${Colors.primaryDark};
            border-color: ${Colors.primaryDark};
          }
          &:disabled {
            background-color: ${Colors.grayScale[600]};
            border-color: ${Colors.grayScale[600]};
            > span {
              color: ${Colors.gray};
            }
          }
        `;
      case 'primary-light':
        return `
          background-color: ${Colors.white};
          border: 1px solid ${Colors.primary};
          > span {
            color: ${Colors.primary};
          } 
          &:hover {
            background-color: ${rgba(Colors.primary, 0.15)};
          }
          &:active {
            background-color: ${rgba(Colors.primary, 0.3)};
          }  
          &:disabled {
            background-color: ${Colors.grayScale[300]};
            border-color: ${Colors.grayScale[400]};
            > span {
              color: ${Colors.gray};
            }
          }
        `;
      case 'white':
        return `
          background-color: ${Colors.white};
          border: 1px solid ${Colors.grayScale[900]};
          > span {
            color: ${Colors.grayScale[900]};
          }
          &:hover {
            background-color: rgba(55, 59, 83, 0.15);
            border: 1px solid ${Colors.grayScale[900]};
            > span {
              color: ${Colors.grayScale[900]};
            }
          }
          &:active {
            background-color: rgba(55, 59, 83, 0.3);
            border: 1px solid ${Colors.grayScale[900]};
            > span {
              color: ${Colors.grayScale[900]};
            }
          }
        `;
      case 'danger':
        return `
          background-color: ${Colors.statusColors.error};
          border: 1px solid ${Colors.statusColors.error};
          > span {
            color: ${Colors.white};
          }
          &:disabled {
            background-color: ${Colors.grayScale[600]};
            border-color: ${Colors.grayScale[600]};
            > span {
              color: ${Colors.gray};
            }
          }
        `;
      case 'danger-light':
        return `
          background-color: ${Colors.white};
          border: 1px solid ${Colors.statusColors.error};
          > span {
            color: ${Colors.statusColors.error};
          } 
          &:hover {
            background-color: ${rgba(Colors.statusColors.error, 0.15)};
          }
          &:active {
            background-color: ${rgba(Colors.statusColors.error, 0.3)};
          }  
          &:disabled {
            background-color: ${Colors.grayScale[300]};
            border-color: ${Colors.grayScale[400]};
            > span {
              color: ${Colors.gray};
            }
          }
        `;
    }
  }};
  ${({ size }) => {
    switch (size) {
      case 'S':
        return `
          min-width: 56px;
          height: 32px;
          padding: 6px 16px;
        `;
      case 'M':
        return `
          height: 40px;
          padding: 10px 16px;
        `;
      case 'L':
        return `
          min-width: 80px;
          height: 48px;
          padding: 14px 16px;
        `;
      case 'XL':
        return `
          min-width: 120px;
          height: 64px;
          padding: 22px 16px;
        `;
    }
  }}

  transition: 0.25s;
`;
