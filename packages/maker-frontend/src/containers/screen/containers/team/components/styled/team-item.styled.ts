import styled from 'styled-components';
import {
  PaddingCss,
  paddingCss,
  PointerCss,
  pointerCss,
  BorderCss,
  borderCss,
  BoxShadowCss,
  boxShadowCss,
  TransitionCss,
  transitionCss,
  FlexboxCss,
  flexboxCss,
} from 'ui';
import media from 'css-in-js-media';

export const TeamItemContainer = styled.div<PaddingCss>`
  ${paddingCss}
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex: 1 1 calc(25%);
  ${media('<=tablet')} {
    flex: 1 1 calc(100%);
  }
`;

export const TeamItemBox = styled.div<FlexboxCss & PaddingCss & PointerCss & BorderCss & BoxShadowCss & TransitionCss>`
  ${flexboxCss}
  ${paddingCss}
  ${pointerCss}
  ${borderCss}
  ${boxShadowCss}
  ${transitionCss}
  &:hover {
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.16), 0 3px 14px rgba(0, 0, 0, 0.23);
  }

  width: 200px;
  height: 200px;
  > img {
    width: 100px;
    height: 100px;
  }
  ${media('<=tablet')} {
    width: 150px;
    height: 150px;
    > img {
      width: 50px;
      height: 50px;
    }
  }
`;
