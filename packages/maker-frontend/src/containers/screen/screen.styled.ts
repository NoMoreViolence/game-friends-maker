import styled, { createGlobalStyle } from 'styled-components';
import { Container } from 'ui';

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
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const StyledContainer = styled(Container)`
  flex: 1 1 auto; /* 1 */
  position: relative;
  min-width: 1px;
  max-width: 1752px;
  margin: 0 auto;
  width: 100%;
`;
