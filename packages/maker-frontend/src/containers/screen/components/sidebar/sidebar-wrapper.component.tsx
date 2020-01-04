import React, { FC, useEffect, useState } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import Sidebar from 'react-sidebar';
import styled from 'styled-components';

import { WidthHeightCss, PaddingCss, TransitionCss, widthHeightCss, paddingCss, transitionCss } from 'ui';
import { color } from 'styles';
import { SidebarComponent } from './sidebar.component';

interface Props {}
export const SidebarWrapper: FC<Props> = ({ children }) => {
  const [isSidebarOpen] = useState(false);
  const [isSidebarHold, setIsSidebarHold] = useState(window.innerWidth > 768);
  useEffect(() => {
    const resize = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        if (window.innerWidth > 768) {
          setIsSidebarHold(true);
        } else {
          setIsSidebarHold(false);
        }
      });
    return () => {
      resize.unsubscribe();
    };
  }, []);

  return (
    <Sidebar
      sidebar={
        <ScrollDiv transition={0.25} width={100} pt={15} pb={15}>
          <SidebarComponent />
        </ScrollDiv>
      }
      open={isSidebarOpen}
      docked={isSidebarHold}
      styles={{
        sidebar: {
          borderRightColor: color['border-gray'],
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
        },
      }}
      shadow={false}
    >
      {children}
    </Sidebar>
  );
};

const ScrollDiv = styled.div<WidthHeightCss & PaddingCss & TransitionCss>`
  ${widthHeightCss}
  ${paddingCss}
  ${transitionCss}
  overflow-y: scroll;
`;
