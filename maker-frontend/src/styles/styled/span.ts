import styled, { css } from 'styled-components';
import { color } from './color';
import { device } from './media';

interface SpanProps {
  weight?: string;
  color?: string;
  cursor?: string;
  hover?: boolean;
  hoverColor?: string;
  align?: string;
}

const CommonSpanStyle = css`
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
`;
const returnColor = (returnColor?: string) => `color: ${returnColor ? returnColor : color.black};`;
const returnCursor = (cusror?: string) => `cursor: ${cusror ? 'pointer' : 'unset'};`;
const returnWeight = (weight?: string) => `font-weight: ${weight ? weight : 'normal'};`;
const returnHover = (hover?: boolean, hoverColor?: string) =>
  hover
    ? `&:hover {
        color: ${hoverColor ? hoverColor : color.black};
      }`
    : '';
const returnAlign = (align?: string) => `text-align: ${align ? align : 'unset'}`;

// 10px
export const TinySpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnCursor(p.cursor)}
  ${p => returnWeight(p.weight)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 0.625rem;
  transition: 0.25s;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.5rem;
  }
`;

// 12px
export const SmallSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnCursor(p.cursor)}
  ${p => returnWeight(p.weight)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 0.75rem;
  transition: 0.25s;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.625rem;
  }
`;

// 14px
export const SmallMiddleSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 0.875rem;
  transition: 0.25s;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.75rem;
  }
`;

// 16px
export const MiddleSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 1rem;
  transition: 0.25s;

  @media screen and ${device.mobileToTablet} {
    font-size: 0.875rem;
  }
`;

// 24px
export const MiddleBigSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 1.5rem;
  transition: 0.25s;

  @media screen and ${device.mobileToTablet} {
    font-size: 1rem;
  }
`;

// 32px
export const BigSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 2rem;
  transition: 0.25s;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;

// 32px
export const GiantSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 3rem;
  transition: 0.25s;

  @media screen and ${device.mobileToTablet} {
    font-size: 1.5rem;
  }
`;
