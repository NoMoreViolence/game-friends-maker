import styled, { css } from 'styled-components';
import { color } from './color';
import { device } from './media';

const { black } = color;

interface SpanProps {
  weight?: string;
  color?: string;
  cursor?: string;
  hover?: boolean;
  hoverColor?: string;
  align?: string;
  transition?: boolean;
  fontStyle?: string | number;
  fontStretch?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
}

const commonSpanStyle = css``;
const returnStyle = ({
  color,
  cursor,
  weight,
  hover,
  hoverColor,
  align,
  transition,
  fontStretch,
  fontStyle,
  lineHeight,
  letterSpacing,
}: SpanProps) =>
  `
    color: ${color ? color : black};
    cursor: ${cursor ? 'pointer' : 'unset'};
    font-weight: ${weight ? weight : 'normal'};
    ${
      hover
        ? `&:hover {
        color: ${hoverColor ? hoverColor : black};
      }`
        : ''
    }
    text-align: ${align ? align : 'unset'};
    font-style: ${fontStyle ? fontStyle : 'normal'};
    font-stretch: ${fontStretch ? fontStretch : 'normal'};
    line-height: ${lineHeight ? lineHeight : 'normal'};
    letter-spacing: ${letterSpacing ? letterSpacing : 'normal'};
    ${typeof transition === 'boolean' && transition === false ? 'transition: unset;' : 'transition: 0.25s;'}
  `;

// 10px
export const TinySpan = styled('span')<SpanProps>`
  ${commonSpanStyle};
  ${p => returnStyle(p)}

  font-size: 0.625rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.5rem;
  }
`;

// 12px
export const SmallSpan = styled('span')<SpanProps>`
  ${commonSpanStyle};
  ${p => returnStyle(p)}

  font-size: 0.75rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.625rem;
  }
`;

// 14px
export const SmallMiddleSpan = styled('span')<SpanProps>`
  ${commonSpanStyle};
  ${p => returnStyle(p)}

  font-size: 0.875rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.75rem;
  }
`;

// 16px
export const MiddleSpan = styled('span')<SpanProps>`
  ${commonSpanStyle};
  ${p => returnStyle(p)}

  font-size: 1rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.875rem;
  }
`;

// 24px
export const MiddleBigSpan = styled('span')<SpanProps>`
  ${commonSpanStyle};
  ${p => returnStyle(p)}

  font-size: 1.5rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1rem;
  }
`;

// 32px
export const BigSpan = styled('span')<SpanProps>`
  ${commonSpanStyle};
  ${p => returnStyle(p)}

  font-size: 2rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 32px
export const GiantSpan = styled('span')<SpanProps>`
  ${commonSpanStyle};
  ${p => returnStyle(p)}

  font-size: 3rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;
