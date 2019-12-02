import styled, { css } from 'styled-components';
import { color } from './color';
import { device } from './media';
import { PaddingCss, MarginCss, marginCss, paddingCss } from 'ui';

const { black } = color;

export interface SpanProps extends MarginCss, PaddingCss {
  weight?: number | string;
  color?: string;
  cursor?: string;
  hover?: boolean;
  hoverColor?: string;
  align?: string;
  padding?: string;

  isEllipsisEnabled?: boolean;

  transition?: boolean;
  fontStyle?: string | number;
  fontStretch?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
}

const commonSpanStyle = css``;
const returnStyle = ({
  padding,
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
  isEllipsisEnabled,
}: SpanProps) =>
  `
    ${padding ? `padding: ${padding};` : ''}
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
    ${
      isEllipsisEnabled
        ? `
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      `
        : ''
    }
    text-align: ${align ? align : 'unset'};
    font-style: ${fontStyle ? fontStyle : 'normal'};
    font-stretch: ${fontStretch ? fontStretch : 'normal'};
    line-height: ${lineHeight ? lineHeight : 'normal'};
    letter-spacing: ${letterSpacing ? letterSpacing : 'normal'};
    ${typeof transition === 'boolean' && transition === true ? 'transition: 0.25s;' : 'transition: unset;'}
  `;

// 10px
export const SpanD625rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 0.625rem;
  @media screen and ${device.mobileToTablet} {
    font-size: 0.5rem;
  }
`;

// 12px
export const SpanD75rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 0.75rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.625rem;
  }
`;

// 14px
export const SpanD875rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 0.875rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.75rem;
  }
`;

// 16px
export const Span1rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 1rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.875rem;
  }
`;

// 24px
export const Span1D5rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 1.5rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1rem;
  }
`;

// 28px
export const Span1D75rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 1.75rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.25rem;
  }
`;

// 32px
export const Span2rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 2rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 48px
export const Span3rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 3rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 48px
export const Span4rem = styled('span')<SpanProps>`
  ${commonSpanStyle}
  ${marginCss}
  ${paddingCss}
  ${p => returnStyle(p)}

  font-size: 4rem;

  @media screen and ${device.mobileToTablet} {
    font-size: 2rem;
  }
`;
