import styled from 'styled-components';
import { margin, MarginProps, padding, PaddingProps, zIndex, ZIndexProps } from 'styled-system';

interface Props extends MarginProps, PaddingProps, ZIndexProps {
  pointer?: boolean; // false
}

export const YScroll = styled.div<Props>`
  ${margin}
  ${padding}
  ${zIndex}
  overflow-y: scroll;
  flex: 1;
`;
