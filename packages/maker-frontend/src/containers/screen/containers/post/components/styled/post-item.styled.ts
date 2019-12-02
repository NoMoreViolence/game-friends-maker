import styled from 'styled-components';
import { PaddingCss, paddingCss } from 'ui';
import media from 'css-in-js-media';

export const PostItemContainer = styled.div<PaddingCss>`
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

export const PostItemBox = styled.div`
  box-sizing: border-box;
  padding: 8px;
  border-radius: 8px;
  transition: 0.25s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  &:hover {
    /* cursor: pointer; */
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.16), 0 3px 14px rgba(0, 0, 0, 0.23);
  }

  width: 400px;
  height: 400px;
  ${media('<=tablet')} {
    width: 300px;
    height: 300px;
  }

  display: flex;
  flex-direction: column;
`;
