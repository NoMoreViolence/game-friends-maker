import React, { FC } from 'react';
import styled from 'styled-components';
import { flexbox, FlexboxProps, margin, MarginProps, padding, PaddingProps, zIndex, ZIndexProps } from 'styled-system';

interface Props
  extends MarginProps,
    PaddingProps,
    ZIndexProps,
    FlexboxProps,
    React.ImgHTMLAttributes<HTMLImageElement> {
  pointer?: boolean; // false
}

export const Img: FC<Props> = (props) => <StyledImg {...props} />;

const StyledImg = styled.img<Props>`
  ${margin}
  ${padding}
  ${zIndex}
  ${flexbox}
  ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')}
`;
