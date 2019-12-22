import styled from 'styled-components';
import { PaddingCss, paddingCss, PointerCss, pointerCss } from 'ui';
import media from 'css-in-js-media';

export const TeamItemContainer = styled.div<PaddingCss>`
  ${paddingCss}
  flex: 1 0 400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${media('<=tablet')} {
    flex: 1 0 300px;
    justify-content: center;
  }
  margin: auto;
`;

export const TeamItemBox = styled.div<PointerCss>`
  box-sizing: border-box;
  padding: 8px;
  border-radius: 8px;
  transition: 0.25s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  ${pointerCss}
  &:hover {
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.16), 0 3px 14px rgba(0, 0, 0, 0.23);
  }

  width: 200px;
  height: 200px;
  ${media('<=tablet')} {
    width: 150px;
    height: 150px;
  }

  display: flex;
  flex-direction: column;
`;
