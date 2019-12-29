import React, { FC } from 'react';

import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss, ZIndexCss, zIndexCss, FlexboxCss, flexboxCss } from 'ui/common';

interface Props extends MarginCss, PaddingCss, ZIndexCss, FlexboxCss, React.ImgHTMLAttributes<HTMLImageElement> {
  pointer?: boolean; // false
}

export const Img: FC<Props> = ({ isFlex = true, ...props }) => <StyledImg isFlex={isFlex} {...props} />;

const StyledImg = styled.img<Props>`
  ${marginCss}
  ${paddingCss}
  ${zIndexCss}
  ${flexboxCss}
  ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')}
`;
