import styled, { css } from 'styled-components';
import { color } from './color';

interface SpanProps {
  weight?: string;
  color?: string;
  cursor?: boolean;
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
const returnCursor = (cusror?: boolean) => `cursor: ${cusror ? 'pointer' : 'unset'};`;
const returnWeight = (weight?: string) => `font-weight: ${weight ? weight : 'normal'};`;
const returnHover = (hover?: boolean, hoverColor?: string) =>
  hover
    ? `&:hover {
        color: ${hoverColor ? hoverColor : color.black};
      }`
    : '';
const returnAlign = (align?: string) => `text-align: ${align ? align : 'unset'}`;

export const SmallSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnCursor(p.cursor)}
  ${p => returnWeight(p.weight)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 0.75rem;
  transition: 0.25s;
`;

export const SmallMiddleSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 0.875rem;
  transition: 0.25s;
`;

export const MiddleSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 1rem;
  transition: 0.25s;
`;

export const MiddleBigSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 1.5rem;
  transition: 0.25s;
`;

export const BigSpan = styled('span')<SpanProps>`
  ${CommonSpanStyle};
  ${p => returnColor(p.color)}
  ${p => returnWeight(p.weight)}
  ${p => returnCursor(p.cursor)}
  ${p => returnHover(p.hover, p.hoverColor)}
  ${p => returnAlign(p.align)}

  font-size: 2rem;
  transition: 0.25s;
`;
