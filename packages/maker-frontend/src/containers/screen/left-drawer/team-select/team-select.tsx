import { CreateTeamModal } from 'components/modals';
import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import React, { FC, useCallback, useState } from 'react';
import { TeamBox } from './team-box';

interface Props {
  teamUserJoins: TeamUserJoinFull[];
  currentTeamUserJoinId: string | null;
  updateTeamUserJoinId(nextUpdateTeamUserJoinId: string | null): void;
  closeDrawer(): void;
}
export const TeamSelect: FC<Props> = ({ currentTeamUserJoinId, teamUserJoins, updateTeamUserJoinId, closeDrawer }) => {
  const selectTeam = useCallback(
    (teamUserJoinId: string | null) => {
      updateTeamUserJoinId(teamUserJoinId);
      closeDrawer();
    },
    [closeDrawer, updateTeamUserJoinId]
  );

  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const openCreateModal = useCallback(() => setVisibleCreateModal(true), []);
  const closeCreateModal = useCallback(() => {
    setVisibleCreateModal(false);
    closeDrawer();
  }, [closeDrawer]);

  return (
    <>
      <TeamBox selected={currentTeamUserJoinId === null} onClick={() => selectTeam(null)}>
        H
      </TeamBox>
      {teamUserJoins.map(teamUserJoin => (
        <TeamBox
          key={teamUserJoin._id}
          selected={currentTeamUserJoinId === teamUserJoin._id}
          onClick={() => selectTeam(teamUserJoin._id)}
        >
          {teamUserJoin.team.name.substring(0, 1).toUpperCase()}
        </TeamBox>
      ))}
      <TeamBox onClick={openCreateModal}>+</TeamBox>
      <CreateTeamModal display={visibleCreateModal} exit={closeCreateModal} />
    </>
  );
};
