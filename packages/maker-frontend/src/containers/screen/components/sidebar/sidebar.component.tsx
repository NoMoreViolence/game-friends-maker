import React, { FC, useState, useCallback, memo } from 'react';
import { useMyTeams } from 'data-fetch';
import { useUpdateCurrentLocation, useCurrentLocation } from 'data-fetch/use-current-location';
import { TeamBox } from './components';
import { MyTeams_myTeams } from 'graphqls/queries/__generated__/MyTeams';
import { CreateTeamModal } from 'components/modals';
import { LoadingComponent } from 'components/loading';

const lastTeamUserJoinId = localStorage.getItem('lastTeamUserJoinId');
export const SidebarComponent: FC = () => {
  const currentLocation = useCurrentLocation();
  const updateTeamUserJoinId = useUpdateCurrentLocation();
  const { data, loading, refetch } = useMyTeams({
    onCompleted: () => {
      if (
        lastTeamUserJoinId &&
        data?.myTeams.filter(s => s._id === lastTeamUserJoinId).length === 1 &&
        currentLocation?.currentTeamUserJoinId !== lastTeamUserJoinId
      ) {
        updateTeamUserJoinId({
          variables: {
            nextCurrentLocation: {
              currentTeamUserJoinId: lastTeamUserJoinId,
            },
          },
        });
      }
    },
  });
  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const toggleVisibleCreateModal = useCallback(() => setVisibleCreateModal(old => !old), []);
  const goHome = useCallback(
    () => updateTeamUserJoinId({ variables: { nextCurrentLocation: { currentTeamUserJoinId: null } } }),
    [updateTeamUserJoinId],
  );

  return (
    <>
      <LoadingComponent isLoading={loading} />
      <TeamBox onClick={goHome}>H</TeamBox>
      {data && <RenderMyTeams currentTeamUserJoinId={currentLocation?.currentTeamUserJoinId} teams={data?.myTeams} />}
      <TeamBox onClick={toggleVisibleCreateModal}>+</TeamBox>
      <CreateTeamModal isOpen={visibleCreateModal} close={toggleVisibleCreateModal} refetchMyTeams={refetch} />
    </>
  );
};

interface RenderMyTeams {
  currentTeamUserJoinId?: string | null;
  teams: MyTeams_myTeams[];
}
const RenderMyTeams: FC<RenderMyTeams> = memo(({ currentTeamUserJoinId, teams }) => (
  <>
    {teams.map((myTeam, idx) => (
      <TeamBoxComponent key={idx} teamInfo={myTeam} currentTeamUserJoinId={currentTeamUserJoinId} />
    ))}
  </>
));

interface TeamBoxProps {
  currentTeamUserJoinId?: string | null;
  teamInfo: MyTeams_myTeams;
}
const TeamBoxComponent: FC<TeamBoxProps> = ({ currentTeamUserJoinId, teamInfo }) => {
  const updateTeamUserJoinId = useUpdateCurrentLocation();
  const updateTeamUserJoinIdTrigger = useCallback(() => {
    updateTeamUserJoinId({
      variables: {
        nextCurrentLocation: {
          currentTeamUserJoinId: teamInfo._id,
        },
      },
    });
  }, [teamInfo._id, updateTeamUserJoinId]);

  return (
    <TeamBox selected={currentTeamUserJoinId === teamInfo._id} onClick={updateTeamUserJoinIdTrigger}>
      {teamInfo.teamId.name.substring(0, 1).toUpperCase()}
    </TeamBox>
  );
};
