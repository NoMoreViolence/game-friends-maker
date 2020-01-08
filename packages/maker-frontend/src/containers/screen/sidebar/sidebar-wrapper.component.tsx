import React, { FC } from 'react';
import Sidebar, { SidebarStyles } from 'react-sidebar';
import styled from 'styled-components';

import { WidthHeightCss, PaddingCss, TransitionCss, widthHeightCss, paddingCss, transitionCss } from 'ui';
import { color } from 'styles';
import { SidebarComponent } from './sidebar.component';

interface Props {
  isSidebarOpen: boolean;
  isSidebarHold: boolean;
  toggleIsSidebarOpen(): void;
}
export const SidebarWrapper: FC<Props> = ({ isSidebarOpen, isSidebarHold, toggleIsSidebarOpen, children }) => (
  <Sidebar
    sidebar={
      <ScrollDiv transition={0.25} width={100} pt={15} pb={15}>
        <SidebarComponent toggleIsSidebarOpen={toggleIsSidebarOpen} />
      </ScrollDiv>
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

const styles: SidebarStyles = {
  sidebar: {
    backgroundColor: color.white,
    borderRightColor: color['border-gray'],
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
  },
};

const ScrollDiv = styled.div<WidthHeightCss & PaddingCss & TransitionCss>`
  ${widthHeightCss}
  ${paddingCss}
  ${transitionCss}
  overflow-y: scroll;
`;
