import styled, { createGlobalStyle } from 'styled-components';
import { color } from '@styles';

export const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;

    body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      scroll-behavior: smooth;

      > div#root {
        width: 100%;
        height: 100%; 
        overflow-y: scroll;
        scroll-behavior: smooth;
      }
    }
  }
`;

export const LandingComponentRootDiv = styled('div')`
  width: 100%;

  > div.landing-01 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.landing-header-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.white};
    }

    > div.landing-01-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.yellow};
    }
  }

  > div.landing-02 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.landing-02-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.white};
    }
  }

  > div.landing-03 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.landing-03-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.white};
    }
  }
`;
