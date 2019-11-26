import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss, WidthHeightCss, widthHeightCss } from 'ui/common';

interface Props extends MarginCss, PaddingCss, WidthHeightCss {}

export const Container = styled.div<Props>`
  ${marginCss}
  ${paddingCss}
  ${widthHeightCss}
  flex: 1;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;
