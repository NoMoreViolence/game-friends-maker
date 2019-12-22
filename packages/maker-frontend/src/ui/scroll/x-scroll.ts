import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss, ZIndexCss, zIndexCss } from 'ui/common';

interface Props extends MarginCss, PaddingCss, ZIndexCss {
  pointer?: boolean; // false
}

export const XScroll = styled.div<Props>`
  ${marginCss}
  ${paddingCss}
  ${zIndexCss}
  overflow-x: scroll;
`;
