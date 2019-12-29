import { css } from 'styled-components';
import {
  MarginCss,
  marginCss,
  PaddingCss,
  paddingCss,
  WidthHeightCss,
  widthHeightCss,
  ZIndexCss,
  zIndexCss,
  BoxShadowCss,
  BorderCss,
  boxShadowCss,
  borderCss,
  BackgroundCss,
  backgroundCss,
  FlexboxCss,
  flexboxCss,
  PositionCss,
  positionCss,
  PointerCss,
  pointerCss,
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
    PositionCss {
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
  box-sizing: border-box;
`;
