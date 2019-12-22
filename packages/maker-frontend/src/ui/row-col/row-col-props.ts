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
} from '../common';
import { PointerCss, pointerCss } from 'ui/common/pointer';

export interface RowColProps
  extends MarginCss,
    PaddingCss,
    WidthHeightCss,
    ZIndexCss,
    BoxShadowCss,
    BorderCss,
    BackgroundCss,
    FlexboxCss,
    PointerCss {
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
  box-sizing: border-box;
`;
