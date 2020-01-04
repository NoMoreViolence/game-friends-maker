import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'ui';

export const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;

    body {
      overscroll-behavior-y: none;
      width: 100%;
      height: 100%;
      scroll-behavior: smooth;

      > div#root {
        width: 100%;
        height: 100%; 
        scroll-behavior: smooth;
      }
    }
  }
`;

export const ScrollContainer = styled(Container)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
  overflow-y: auto;
  margin: auto;
`;
