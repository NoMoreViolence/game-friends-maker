import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import WebModal from '@material-ui/core/Modal';
import React, { CSSProperties, FC } from 'react';
import styled from 'styled-components';
import { height, HeightProps, padding, PaddingProps, width, WidthProps } from 'styled-system';
import { Colors } from 'ui/Colors';

const webContainerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(4px)',
};

interface Props extends WidthProps, HeightProps, PaddingProps {
  disableBackdropClick?: boolean; // false
  display: boolean;
  exit?(): void;
  style?: CSSProperties;
}
export const Modal: FC<Props> = ({
  disableBackdropClick = false,
  display,
  exit,
  children,
  width,
  height,
  style = {},
  padding,
  pt,
  pb,
  pr,
  pl,
}) => (
  <WebModal
    open={display}
    disableBackdropClick={disableBackdropClick}
    onEscapeKeyDown={exit}
    BackdropComponent={Backdrop}
    onBackdropClick={exit}
    closeAfterTransition
    style={webContainerStyle}
  >
    <Fade in={display} timeout={{ enter: 250, exit: 250 }}>
      <ModalBody width={width} height={height} style={style} padding={padding} pt={pt} pb={pb} pl={pl} pr={pr}>
        {children}
      </ModalBody>
    </Fade>
  </WebModal>
);

interface ModalBodyProps extends WidthProps, HeightProps, PaddingProps {}
const ModalBody = styled.div<ModalBodyProps>`
  position: relative;
  background-color: ${Colors.white};
  width: 350px;
  height: unset;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 6px;
  ${width}
  ${height}
  ${padding}
`;
