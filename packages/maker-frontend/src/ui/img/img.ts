import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss, ZIndexCss, zIndexCss } from 'ui/common';

interface Props extends MarginCss, PaddingCss, ZIndexCss {
  pointer?: boolean; // false
}

export const Img = styled.img<Props>`
  ${marginCss}
  ${paddingCss}
  ${zIndexCss}
  ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')}
`;
