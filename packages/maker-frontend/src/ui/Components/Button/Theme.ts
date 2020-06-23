import { css } from 'styled-components';
import { MarginProps } from 'styled-system';
import { Colors } from 'ui/Colors';

export interface ButtonStyleProps extends MarginProps {
  theme: 'primary-light' | 'primary' | 'white' | 'red' | 'red-light';
}

export const buttonCommonTheme = css`
  appearance: none;
  border-radius: 4px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const primary = css`
  ${buttonCommonTheme}
  background-color: ${Colors.primary};
  border: 1px solid ${Colors.primary};
  > span {
    color: ${Colors.white};
  }
  &:hover {
    background-color: ${Colors.primaryScale[700]};
    border: 1px solid ${Colors.primaryScale[700]};
    > span {
      color: ${Colors.white};
    }
  }
  &:active {
    background-color: ${Colors.primaryScale[900]};
    border: 1px solid ${Colors.primaryScale[900]};
    > span {
      color: ${Colors.white};
    }
  }
  &:disabled {
    background-color: ${Colors.grayScale[600]};
    border: 1px solid ${Colors.grayScale[600]};
    > span {
      color: #c3c9d5;
    }
  }
`;
const primaryLight = css`
  ${buttonCommonTheme}
  background-color: ${Colors.white};
  border: 1px solid ${Colors.primary};
  > span {
    color: ${Colors.primary};
  }
  &:hover {
    background-color: rgba(99, 97, 227, 0.15);
    border: 1px solid ${Colors.primary};
    > span {
      color: ${Colors.primary};
    }
  }
  &:active {
    background-color: rgba(99, 97, 227, 0.3);
    border: 1px solid ${Colors.primary};
    > span {
      color: ${Colors.primary};
    }
  }
  &:disabled {
    background-color: ${Colors.grayScale[300]};
    border: 1px solid ${Colors.grayScale[400]};
    > span {
      color: #cad1dc;
    }
  }
`;
const white = css`
  ${buttonCommonTheme}
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
const red = css`
  ${buttonCommonTheme}
  background-color: ${Colors.statusColors.error};
  border: 1px solid ${Colors.statusColors.error};
  > span {
    color: ${Colors.white};
  }
`;
const redLight = css`
  ${buttonCommonTheme}
  background-color: ${Colors.white};
  border: 1px solid ${Colors.statusColors.error};
  > span {
    color: ${Colors.statusColors.error};
  }
  &:hover {
    background-color: rgba(255, 76, 76, 0.15);
    border: 1px solid ${Colors.statusColors.error};
    > span {
      color: ${Colors.statusColors.error};
    }
  }
  &:active {
    background-color: rgba(255, 76, 76, 0.3);
    border: 1px solid ${Colors.statusColors.error};
    > span {
      color: ${Colors.statusColors.error};
    }
  }
`;
const wideWhite = css`
  ${buttonCommonTheme}
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  background-color: ${Colors.white};
  > span {
    color: ${Colors.black};
  }
  &:hover {
    background-color: ${Colors.grayScale[100]};
    > span {
      color: ${Colors.black};
    }
  }
  &:active {
    background-color: ${Colors.grayScale[300]};
    > span {
      color: ${Colors.black};
    }
  }
`;

export const themeSelector = css<{ theme?: ButtonStyleProps['theme'] }>`
  ${({ theme }) => {
    switch (theme) {
      case 'primary':
        return primary;
      case 'primary-light':
        return primaryLight;
      case 'red':
        return red;
      case 'red-light':
        return redLight;
      case 'white':
        return white;
    }
  }}
`;

export const colorSelector = (theme?: ButtonStyleProps['theme']) => {
  switch (theme) {
    case 'primary':
      return Colors.white;
    case 'primary-light':
      return Colors.primary;
    case 'red':
      return Colors.white;
    case 'red-light':
      return Colors.statusColors.error;
    case 'white':
      return Colors.black;
  }
};

export const buttonTheme = {
  primary,
  primaryLight,
  white,
  red,
  redLight,
  wideWhite,
};
