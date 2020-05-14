import styled from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
} from 'styled-system';

interface Props extends LayoutProps, MarginProps, PaddingProps, PositionProps, BorderProps, BackgroundProps {}

export const ScrollContainer = styled.div<Props>`
  ${layout}
  ${margin}
  ${padding}
  ${border}
  ${background}
  ${position}
  position: relative;
  overflow: scroll;
  overflow-y: auto;
`;
