import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss, ZIndexCss, zIndexCss } from 'ui/common';

interface Props extends MarginCss, PaddingCss, ZIndexCss {
  pointer?: boolean; // false
}

export const YScroll = styled.div<Props>`
  ${marginCss}
  ${paddingCss}
  ${zIndexCss}
  overflow-y: scroll;
  /* height: 100%; */
  flex: 1;
`;
