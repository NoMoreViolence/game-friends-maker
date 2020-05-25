import React, { FC, useCallback } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { margin, MarginProps, fontWeight, FontWeightProps, PaddingProps, padding } from 'styled-system';
import { Colors } from 'ui/styles';

function getButtonSize(size?: 'small' | 'medium' | 'large' | 'wide') {
  switch (size) {
    case 'small':
      return `
        padding: 12px;
        font-size: 12px;
      `;
    case 'medium':
      return `
        padding: 12px;
        font-size: 16px;
      `;
    case 'large':
      return `
        padding: 12px;
        font-size: 20px;
      `;
    case 'wide':
      return `
        flex: 1;
        width: 100%;
        padding: 12px;
        font-size: 24px;
      `;
    default:
      return `
        padding: 12px;
        font-size: 16px;
      `;
  }
}

function getButtonType(type: ButtonType) {
  switch (type) {
    case 'black':
      return `
        background-color: ${Colors.likeBlack};
        border-radius: 4px;
        border-width: 1px;
        border-style: solid;
        border-color: ${Colors.likeBlack};
        color: ${Colors.likeWhite};
        &:hover {
          box-shadow: 0 0 0 .2em rgba(0, 0, 0, 0.5);
        }
      `;
    case 'white':
      return `
        background-color: ${Colors.likeWhite};
        border-radius: 4px;
        border-width: 1px;
        border-style: solid;
        border-color: ${Colors.likeBlack};
        color: ${Colors.likeBlack};
        &:hover {
          box-shadow: 0 0 0 .2em rgba(255, 255, 255, 0.5);
        }
      `;
    case 'yellow':
      return `
        background-color: ${Colors.yellow};
        border-radius: 4px;
        border-width: 1px;
        border-style: solid;
        border-color: ${Colors.yellow};
        color: ${Colors.black};
        &:hover {
          box-shadow: 0 0 0 .2em rgba(255, 220, 3, 0.5);
        }
        &:disabled {
          
        }
      `;
    case 'red':
      return `
          background-color: ${Colors.error};
          border-radius: 4px;
          border-width: 1px;
          border-style: solid;
          border-color: ${Colors.likeWhite};
          color: ${Colors.error};
          &:hover {
            box-shadow: 0 0 0 .2em rgba(255, 41, 13, 0.5);
          }
        `;
    default:
      break;
  }
}

type ButtonType = 'black' | 'white' | 'red' | 'yellow';
interface Props extends PaddingProps, MarginProps, FontWeightProps {
  text: string;
  onClick(): void;
  isDisabled?: boolean;
  isLoading?: boolean;
  type: ButtonType;
  size?: 'small' | 'medium' | 'large' | 'wide';
}
export const Button: FC<Props> = ({
  size = 'medium',
  text,
  onClick,
  isDisabled = false,
  isLoading = false,
  mt,
  mb,
  mr,
  ml,
  pt,
  pb,
  pr,
  pl,
  type,
  fontWeight,
}) => {
  const onPress = useCallback(() => {
    if (!isDisabled && !isLoading) {
      onClick();
    }
  }, [onClick, isDisabled, isLoading]);

  return (
    <StyledButton
      onClick={onPress}
      disabled={isDisabled}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      pt={pt}
      pb={pb}
      pr={pr}
      pl={pl}
      buttonSize={size}
      buttonType={type}
      fontWeight={fontWeight}
    >
      {isLoading ? <Loader type="Puff" color={Colors.gray} height={20} width={20} /> : text}
    </StyledButton>
  );
};

interface StyledProps extends PaddingProps, MarginProps, FontWeightProps {
  buttonSize: Props['size'];
  buttonType: Props['type'];
}
const StyledButton = styled.button<StyledProps>`
  ${({ buttonSize }) => getButtonSize(buttonSize)}
  ${({ buttonType }) => getButtonType(buttonType)}
  font-weight: 500;
  ${fontWeight}
  ${margin}
  ${padding}

  &:disabled {
    border-color: ${Colors.gray};
    background-color: ${Colors.gray};
    color: ${Colors.likeBlack};
    box-shadow: none;
    cursor: not-allowed;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.5s;
`;
