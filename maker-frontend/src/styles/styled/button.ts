import styled, { css } from 'styled-components';
import { color } from './color';
import { device } from './media';
import { SpanProps } from './span';

const { white } = color;

export interface ButtonProps extends SpanProps {
  hover?: boolean;

  backgroundColor?: string;
  hoverBackgroundColor?: string;

  borderColor?: string;
  hoverBorderColor?: string;

  cursor?: string;
  transition?: boolean;
}

const CommonButtonStyle = css`
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 2px;
  background-color: white;
`;
const returnStyle = ({
  hover,
  color,
  hoverColor,
  backgroundColor,
  hoverBackgroundColor,
  borderColor,
  hoverBorderColor,
  cursor,
  transition,

  nowrap,
  align,
  weight,
  fontStretch,
  fontStyle,
  lineHeight,
  letterSpacing,
}: ButtonProps) =>
  `
    cursor: ${cursor ? cursor : 'unset'};

    white-space: ${nowrap ? 'nowrap' : 'unset'};
    font-weight: ${weight ? weight : 'normal'};
    text-align: ${align ? align : 'unset'};
    font-style: ${fontStyle ? fontStyle : 'normal'};
    font-stretch: ${fontStretch ? fontStretch : 'normal'};
    line-height: ${lineHeight ? lineHeight : 'normal'};
    letter-spacing: ${letterSpacing ? letterSpacing : 'normal'};

    color: ${color ? color : white};
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

    ${typeof transition === 'boolean' && transition === true ? 'transition: 0.25s;' : 'transition: unset;'}
  `;

// 4px
export const ButtonD4rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 0.25rem;

  font-size: 0.625rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.5rem;
  }
`;

// 8px
export const ButtonD5rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 0.5rem;

  font-size: 0.75rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.625rem;
  }
`;

// 12px
export const ButtonD75rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 0.75rem;

  font-size: 0.875rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.75rem;
  }
`;

// 16px
export const Button1rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 1rem;

  font-size: 1rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.875rem;
  }
`;

// 20px
export const Button1D25rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 1.25rem;

  font-size: 1.5rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1rem;
  }
`;

// 24px
export const Button1D5rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 1.5rem;

  font-size: 2rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 28px
export const Button1D75rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 1.75rem;

  font-size: 3rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 32px
export const Button2rem = styled('button')<ButtonProps>`
  ${CommonButtonStyle};
  ${p => returnStyle(p)};
  padding: 2rem;

  font-size: 4rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 2rem;
  }
`;
