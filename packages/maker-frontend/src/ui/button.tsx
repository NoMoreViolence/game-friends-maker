import MButton from '@material-ui/core/Button';
import React, { FC, useCallback } from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import { margin, MarginProps } from 'styled-system';
import { Colors } from 'ui/color';
import { textStyles } from 'ui/typo';

type ButtonType = 'primary' | 'secondary';
interface Props extends MarginProps {
  text: string;
  onClick(): void;
  isDisabled?: boolean;
  isLoading?: boolean;
  type: ButtonType;
  size?: 'small' | 'medium' | 'large';
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
  type,
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
      color={type}
      variant="outlined"
      size={size}
    >
      {isLoading ? <Loader type="Puff" color={Colors.gray} height={20} width={20} /> : text}
    </StyledButton>
  );
};

interface ButtonProps extends MarginProps {
  type: ButtonType;
}
const StyledButton = styled(MButton)<MarginProps>`
  ${margin}
  ${textStyles.px16}
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.25s;
  box-sizing: border-box;
`;
