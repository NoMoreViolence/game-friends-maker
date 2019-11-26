import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss } from 'ui/common';

interface Props extends MarginCss, PaddingCss {
  pointer?: boolean; // false
}

export const Img = styled.img<Props>`
  ${marginCss}
  ${paddingCss}
  ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')}
`;
