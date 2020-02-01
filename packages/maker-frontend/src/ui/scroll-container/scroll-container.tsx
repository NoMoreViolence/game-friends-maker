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
  BorderCss,
  borderCss,
  BackgroundCss,
  backgroundCss,
} from 'ui/common';

interface Props extends WidthHeightCss, MarginCss, PaddingCss, ZIndexCss, BorderCss, BackgroundCss {}

export const ScrollContainer = styled.div<Props>`
  ${widthHeightCss}
  ${marginCss}
  ${paddingCss}
  ${zIndexCss}
  ${borderCss}
  ${backgroundCss}
  position: relative;
  overflow: scroll;
  overflow-y: auto;
`;
