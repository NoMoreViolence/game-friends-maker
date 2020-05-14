import { createGlobalStyle } from 'styled-components';
import { zIndex } from 'ui/styles';

export const ModalOnStyle = createGlobalStyle`
  #modal {
    z-index: ${zIndex.heaven};
    position: fixed;
    right: 0px;
    bottom: 0px;
    top: 0px;
    left: 0px;
  }
`;

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
