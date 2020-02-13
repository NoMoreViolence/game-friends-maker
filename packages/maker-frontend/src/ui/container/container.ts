import styled from 'styled-components';
import {
  MarginCss,
  PaddingCss,
  marginCss,
  paddingCss,
  WidthHeightCss,
  widthHeightCss,
  ZIndexCss,
  zIndexCss,
} from 'ui/common';

interface Props extends MarginCss, PaddingCss, WidthHeightCss, ZIndexCss {
  contentStartLocation?: 'top' | 'bottom';
}

export const Container = styled.div<Props>`
  ${marginCss}
  ${paddingCss}
  ${widthHeightCss}
  ${zIndexCss}
  flex: 1;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  ${({ contentStartLocation = 'top' }) =>
    contentStartLocation === 'top' ? 'justify-content: flex-start' : 'justify-content: flex-end'};
`;
