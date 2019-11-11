import styled from 'styled-components';
import { zIndex, color } from 'styles';

export const ModalRootDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
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
    border-radius: 0.75rem;
    border: 0px solid transparent;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  }
`;
