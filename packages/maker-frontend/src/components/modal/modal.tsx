import React, { FC, CSSProperties } from 'react';
import Fade from '@material-ui/core/Fade';
import WebModal from '@material-ui/core/Modal';
import styled from 'styled-components';
import { Colors } from 'ui';

const webContainerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(36, 36, 36, 0.82)',
};

interface Props {
  display: boolean; // false
  exit?(): void;
}

export const Modal: FC<Props> = ({ display, exit, children }) => (
  <WebModal open={display} onBackdropClick={exit} style={webContainerStyle}>
    <Fade in={display} timeout={{ enter: 250, exit: 250 }}>
      <ModalBody isResponsive>{children}</ModalBody>
    </Fade>
  </WebModal>
);

const ModalBody = styled.div<{ isResponsive?: boolean }>`
  border-radius: 6px;
  background-color: ${Colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  @media screen and (min-width: 950px) {
    ${({ isResponsive }) =>
      isResponsive
        ? `width: 60%;
           height: 60%;
           border: none;
          `
        : ''}
  }
`;
