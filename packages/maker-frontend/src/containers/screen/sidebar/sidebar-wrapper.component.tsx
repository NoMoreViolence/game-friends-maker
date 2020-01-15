import React, { FC } from 'react';
import Sidebar, { SidebarStyles } from 'react-sidebar';
import styled from 'styled-components';

import {
  WidthHeightCss,
  PaddingCss,
  TransitionCss,
  widthHeightCss,
  paddingCss,
  transitionCss,
  Row,
  BorderCss,
  borderCss,
} from 'ui';
import { color } from 'styles';
import { SelectWorkspace } from './select-workspace';
import { useCurrentLocation } from 'data-fetch/use-current-location';

interface Props {
  isSidebarOpen: boolean;
  isSidebarHold: boolean;
  toggleIsSidebarOpen(): void;
}
export const SidebarWrapper: FC<Props> = ({ isSidebarOpen, isSidebarHold, toggleIsSidebarOpen, children }) => {
  const { currentTeamUserJoinId } = useCurrentLocation();

  return (
    <Sidebar
      sidebar={
        <Row height="100%" alignItems="stretch">
          <ScrollDiv
            borderStyle="solid"
            borderColor={color['border-gray']}
            borderRightWidth={1}
            pt={15}
            pb={15}
            width={90}
            transition={0.25}
          >
            <SelectWorkspace toggleIsSidebarOpen={toggleIsSidebarOpen} />
          </ScrollDiv>
          {currentTeamUserJoinId !== null && (
            <ScrollDiv
              borderStyle="solid"
              borderColor={color['border-gray']}
              borderRightWidth={1}
              pt={15}
              pb={15}
              pr={15}
              pl={15}
              width={200}
              transition={0.25}
            >
              Channel, Online user, Workspace Setting
            </ScrollDiv>
          )}
        </Row>
      }
      onSetOpen={toggleIsSidebarOpen}
      open={isSidebarOpen}
      docked={isSidebarHold}
      styles={styles}
      touch
      shadow={false}
    >
      {children}
    </Sidebar>
  );
};

const styles: SidebarStyles = {
  sidebar: {
    backgroundColor: color.white,
    borderRightWidth: '0px',
  },
};

const ScrollDiv = styled.div<WidthHeightCss & PaddingCss & TransitionCss & BorderCss>`
  ${widthHeightCss}
  ${paddingCss}
  ${transitionCss}
  ${borderCss}
  overflow-x: hidden;
  overflow-y: scroll;
`;
