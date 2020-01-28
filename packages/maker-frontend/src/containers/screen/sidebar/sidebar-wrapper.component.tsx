import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useCurrentTeamUserJoin } from 'graphqls/queries/MY_TEAMS';
import React, { FC } from 'react';
import Sidebar, { SidebarStyles } from 'react-sidebar';
import styled from 'styled-components';
import { color } from 'styles';
import { PaddingCss, paddingCss, Row, WidthHeightCss, widthHeightCss } from 'ui';
import { SelectChannel } from './select-channel';
import { SelectTeam } from './select-team';

interface Props {
  isSidebarOpen: boolean;
  isSidebarHold: boolean;
  toggleIsSidebarOpen(): void;
}
export const SidebarWrapper: FC<Props> = ({ isSidebarOpen, isSidebarHold, toggleIsSidebarOpen, children }) => {
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const currentTeamUserJoin = useCurrentTeamUserJoin(currentTeamUserJoinId);

  return (
    <Sidebar
      sidebar={
        <Row height="100%" alignItems="stretch">
          <ScrollDiv pt={15} pb={15} width={90}>
            <SelectTeam currentTeamUserJoinId={currentTeamUserJoinId} toggleIsSidebarOpen={toggleIsSidebarOpen} />
          </ScrollDiv>
          {currentTeamUserJoin && (
            <ScrollDiv pt={15} pb={15} pr={15} pl={15} width={200}>
              <SelectChannel currentTeamUserJoin={currentTeamUserJoin} toggleIsSidebarOpen={toggleIsSidebarOpen} />
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

const ScrollDiv = styled.div<WidthHeightCss & PaddingCss>`
  ${widthHeightCss}
  ${paddingCss}
  border-right-color: ${color['border-gray']};
  border-right-style: solid;
  border-right-width: 1px;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: 0.25s;
`;
