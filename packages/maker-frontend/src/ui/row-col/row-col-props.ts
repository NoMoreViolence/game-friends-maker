import { css } from 'styled-components';
import {
  BackgroundCss,
  backgroundCss,
  BorderCss,
  borderCss,
  BoxShadowCss,
  boxShadowCss,
  FlexboxCss,
  flexboxCss,
  HoverStyleCss,
  hoverStyleCss,
  MarginCss,
  marginCss,
  PaddingCss,
  paddingCss,
  PointerCss,
  pointerCss,
  PositionCss,
  positionCss,
  TransitionCss,
  transitionCss,
  WidthHeightCss,
  widthHeightCss,
  ZIndexCss,
  zIndexCss,
} from '../common';

export interface RowColProps
  extends MarginCss,
    PaddingCss,
    WidthHeightCss,
    ZIndexCss,
    BoxShadowCss,
    BorderCss,
    BackgroundCss,
    FlexboxCss,
    PointerCss,
    PositionCss,
    TransitionCss,
    HoverStyleCss {
  isReversed?: boolean;
  style?: React.CSSProperties;
}

export const rowColBaseStyle = css<RowColProps>`
  ${marginCss}
  ${paddingCss}
  ${widthHeightCss}
  ${zIndexCss}
  ${boxShadowCss}
  ${borderCss}
  ${backgroundCss}
  ${flexboxCss}
  ${pointerCss}
  ${positionCss}
  ${transitionCss}
  ${hoverStyleCss}
  box-sizing: border-box;
`;
