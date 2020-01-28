import { LoadingComponent } from 'components/loading';
import { CreateTeamModal } from 'components/modals';
import { useUpdateTeamUserJoinId } from 'graphqls/mutations/UPDATE_TEAM_USER_JOIN_ID';
import { useMyTeams } from 'graphqls/queries/MY_TEAMS';
import React, { FC, useCallback, useState } from 'react';
import { TeamBox } from './team-box';

const lastTeamUserJoinId = localStorage.getItem('lastTeamUserJoinId');
interface Props {
  currentTeamUserJoinId: string | null;
  toggleIsSidebarOpen(): void;
}
export const SelectTeam: FC<Props> = ({ currentTeamUserJoinId, toggleIsSidebarOpen }) => {
  const updateTeamUserJoinId = useUpdateTeamUserJoinId();
  const { data, loading } = useMyTeams({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      const selectedTeamUserJoin = data?.myTeams.find(s => s._id === lastTeamUserJoinId);
      if (lastTeamUserJoinId && selectedTeamUserJoin !== undefined && currentTeamUserJoinId !== lastTeamUserJoinId) {
        updateTeamUserJoinId(lastTeamUserJoinId);
      }
    },
  });
  const myTeamUserJoins = data?.myTeams;

  const goHome = useCallback(() => {
    updateTeamUserJoinId(null);
    toggleIsSidebarOpen();
  }, [toggleIsSidebarOpen, updateTeamUserJoinId]);
  const updateTeamUserJoinIdTrigger = useCallback(
    (teamUserJoinId: string) => {
      updateTeamUserJoinId(teamUserJoinId);
      toggleIsSidebarOpen();
    },
    [updateTeamUserJoinId, toggleIsSidebarOpen],
  );

  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const toggleVisibleCreateModal = useCallback(
    (created?: boolean | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setVisibleCreateModal(old => !old);
      if (typeof created === 'boolean' && created) {
        toggleIsSidebarOpen();
      }
    },
    [toggleIsSidebarOpen],
  );

  return (
    <>
      <LoadingComponent isLoading={loading} />
      <TeamBox selected={currentTeamUserJoinId === null} onClick={goHome}>
        H
      </TeamBox>
      {myTeamUserJoins?.map(teamUserJoin => (
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
