import styled from 'styled-components';
import {
  background,
  BackgroundProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  position,
  PositionProps,
} from 'styled-system';

interface Props extends MarginProps, PaddingProps, LayoutProps, PositionProps, BackgroundProps {}

export const Container = styled.div<Props>`
  ${margin}
  ${padding}
  ${layout}
  ${position}
  ${background}
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;
