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
  PositionCss,
  positionCss,
} from 'ui/common';

interface Props extends WidthHeightCss, MarginCss, PaddingCss, ZIndexCss, BorderCss, BackgroundCss, PositionCss {}

export const ScrollContainer = styled.div<Props>`
  ${widthHeightCss}
  ${marginCss}
  ${paddingCss}
  ${zIndexCss}
  ${borderCss}
  ${backgroundCss}
  ${positionCss}
  position: relative;
  overflow: scroll;
  overflow-y: auto;
`;
