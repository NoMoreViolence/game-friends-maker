import styled from 'styled-components';
import {
  MarginCss,
  PaddingCss,
  marginCss,
  paddingCss,
  ZIndexCss,
  zIndexCss,
  WidthHeightCss,
  widthHeightCss,
} from 'ui/common';

interface Props extends WidthHeightCss, MarginCss, PaddingCss, ZIndexCss {}

export const ScrollContainer = styled.div<Props>`
  ${widthHeightCss}
  ${marginCss}
  ${paddingCss}
  ${zIndexCss}
  position: relative;
  overflow: scroll;
  overflow-y: auto;
`;
