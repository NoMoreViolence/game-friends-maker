import styled, { css } from 'styled-components';
import { color } from './color';
import { device } from './media';

const { black, white } = color;

export interface InputProps {
  weight?: string;
  cursor?: string;
  hover?: boolean;
  align?: string;

  padding?: string;

  color?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;

  nowrap?: boolean;
  transition?: boolean;
  fontStyle?: string | number;
  fontStretch?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
}

const commonInputStyle = css`
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 2px;
  background-color: white;
`;
const returnStyle = ({
  color,
  cursor,
  weight,
  hover,
  hoverColor,
  borderColor,
  hoverBorderColor,
  backgroundColor,
  hoverBackgroundColor,

  padding,
  align,
  nowrap,
  transition,
  fontStretch,
  fontStyle,
  lineHeight,
  letterSpacing,
}: InputProps) =>
  `
    cursor: ${cursor ? 'pointer' : 'initial'};
    font-weight: ${weight ? weight : 'normal'};
    ${padding ? `padding: ${padding};` : ''}

    color: ${color ? color : black};
    border-color: ${borderColor ? borderColor : white};
    background-color: ${backgroundColor ? backgroundColor : white};
    ${
      hover
        ? `&:hover {
        color: ${hoverColor ? hoverColor : white};
        border-color: ${hoverBorderColor ? hoverBorderColor : white};
        background-color: ${hoverBackgroundColor ? hoverBackgroundColor : white};
      }`
        : ''
    }
    white-space: ${nowrap ? 'nowrap' : 'unset'};
    text-align: ${align ? align : 'unset'};
    font-style: ${fontStyle ? fontStyle : 'normal'};
    font-stretch: ${fontStretch ? fontStretch : 'normal'};
    line-height: ${lineHeight ? lineHeight : 'normal'};
    letter-spacing: ${letterSpacing ? letterSpacing : 'normal'};
    ${typeof transition === 'boolean' && transition === true ? 'transition: 0.25s;' : 'transition: unset;'}
  `;

// 10px
export const InputD625rem = styled('input')<InputProps>`
  padding: 0.25rem;
  font-size: 0.625rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 0.5rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;

// 12px
export const InputD75rem = styled('input')<InputProps>`
  padding: 0.5rem;
  font-size: 0.75rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 0.625rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;

// 14px
export const InputD875rem = styled('input')<InputProps>`
  padding: 0.75rem;
  font-size: 0.875rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 0.75rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;

// 16px
export const Input1rem = styled('input')<InputProps>`
  padding: 1rem;
  font-size: 1rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 0.875rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;

// 24px
export const Input1D5rem = styled('input')<InputProps>`
  padding: 1.25rem;
  font-size: 1.5rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 1rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;

// 32px
export const Input2rem = styled('input')<InputProps>`
  padding: 1.5rem;
  font-size: 2rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;

// 48px
export const Input3rem = styled('input')<InputProps>`
  padding: 1.75rem;
  font-size: 3rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;

// 48px
export const Input4rem = styled('input')<InputProps>`
  padding: 2rem;
  font-size: 4rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 2rem;
  }

  ${commonInputStyle};
  ${p => returnStyle(p)}
`;
