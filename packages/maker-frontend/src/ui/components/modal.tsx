import Fade from '@material-ui/core/Fade';
import WebModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import React, { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { HeightProps, WidthProps, width, height, PaddingProps, padding } from 'styled-system';
import { Colors } from 'ui/styles/color';

const webContainerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(4px)',
};
const backdropProps = { timeout: 500 };

interface Props extends WidthProps, HeightProps, PaddingProps {
  display: boolean;
  exit?(): void;
}

export const Modal: FC<Props> = ({ display, exit, width, height, pt, pb, pr, pl, padding, children }) => (
  <WebModal
    open={display}
    onBackdropClick={exit}
    onEscapeKeyDown={exit}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={backdropProps}
    style={webContainerStyle}
  >
    <Fade in={display}>
      <ModalBody width={width} height={height} pt={pt} pb={pb} pr={pr} pl={pl} padding={padding}>
        {children}
      </ModalBody>
    </Fade>
  </WebModal>
);

interface ModalBodyProps extends WidthProps, HeightProps, PaddingProps {}
const ModalBody = styled.div<ModalBodyProps>`
  ${width}
  ${height}
  ${padding}
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 6px;
  background-color: ${Colors.white};
`;
