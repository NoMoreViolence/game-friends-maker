import styled from 'styled-components';
import media from 'css-in-js-media';
import { zIndex, color } from 'styles';

export const ModalRootDiv = styled.div`
  position: fixed;
  max-height: stretch;
  min-height: stretch;
  max-width: stretch;
  min-width: stretch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${zIndex.heaven};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${color['modal-dim']};

  > div {
    ${media('<tablet')} {
      box-sizing: border-box;
      border-radius: 0;
      height: 100%;
      width: 100%;
    }

    ${media('>=tablet')} {
      max-width: 650px;
      max-height: 650px;
      width: 650px;
      height: 500px;
    }
    background-color: white;
    border-radius: 0.75rem;
    border: 0px solid transparent;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  }
`;
