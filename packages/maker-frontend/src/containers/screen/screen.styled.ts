import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;

    body {
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

export const ScreenRootDiv = styled('div')`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
