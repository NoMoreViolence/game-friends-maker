import { LoadingComponent } from 'components/loading';
import { CreateTeamModal } from 'components/modals';
import { useUpdateTeamUserJoinId } from 'graphqls/mutations/UPDATE_TEAM_USER_JOIN_ID';
import { useCurrentTeamUserJoinId } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { useMyTeams } from 'graphqls/queries/MY_TEAMS';
import { MyTeams_myTeams } from 'graphqls/queries/__generated__/MyTeams';
import React, { FC, useCallback, useState } from 'react';
import { TeamBox } from './team-box';

const lastTeamUserJoinId = localStorage.getItem('lastTeamUserJoinId');
interface Props {
  toggleIsSidebarOpen(): void;
  selectTeamUserJoin(teamUserJoin: MyTeams_myTeams | null): void;
}
export const SelectWorkspace: FC<Props> = ({ toggleIsSidebarOpen, selectTeamUserJoin }) => {
  const currentTeamUserJoinId = useCurrentTeamUserJoinId();
  const updateTeamUserJoinId = useUpdateTeamUserJoinId();
  const { data, loading } = useMyTeams({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      const selectedTeamUserJoin = data?.myTeams.find(s => s._id === lastTeamUserJoinId);
      if (lastTeamUserJoinId && selectedTeamUserJoin !== undefined && currentTeamUserJoinId !== lastTeamUserJoinId) {
        updateTeamUserJoinId(lastTeamUserJoinId);
        selectTeamUserJoin(selectedTeamUserJoin);
      }
    },
  });

  const goHome = useCallback(() => {
    updateTeamUserJoinId(null);
    toggleIsSidebarOpen();
  }, [toggleIsSidebarOpen, updateTeamUserJoinId]);
  const updateTeamUserJoinIdTrigger = useCallback(
    (teamUserJoinId: string) => {
      const selectedTeamUserJoin = data?.myTeams.find(teamUserJoin => teamUserJoin._id === teamUserJoinId) ?? null;
      updateTeamUserJoinId(teamUserJoinId);
      selectTeamUserJoin(selectedTeamUserJoin);
      toggleIsSidebarOpen();
    },
    [data, updateTeamUserJoinId, selectTeamUserJoin, toggleIsSidebarOpen],
  );

  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const toggleVisibleCreateModal = useCallback(
    (created?: boolean | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (typeof created === 'boolean' && created) {
        toggleIsSidebarOpen();
      }
      setVisibleCreateModal(old => !old);
    },
    [toggleIsSidebarOpen],
  );

  return (
    <>
      <LoadingComponent isLoading={loading} />
      <TeamBox selected={currentTeamUserJoinId === null} onClick={goHome}>
        H
      </TeamBox>
      {data &&
        data.myTeams.map(teamUserJoin => (
          <TeamBox
            key={teamUserJoin._id}
            selected={currentTeamUserJoinId === teamUserJoin._id}
            onClick={() => updateTeamUserJoinIdTrigger(teamUserJoin._id)}
          >
            {teamUserJoin.team.name.substring(0, 1).toUpperCase()}
          </TeamBox>
        ))}
      <TeamBox onClick={toggleVisibleCreateModal}>+</TeamBox>
      <CreateTeamModal isOpen={visibleCreateModal} close={toggleVisibleCreateModal} />
    </>
  );
};
