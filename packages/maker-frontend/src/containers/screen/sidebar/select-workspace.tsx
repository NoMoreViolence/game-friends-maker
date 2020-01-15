import React, { FC, useState, useCallback } from 'react';
import { useMyTeams } from 'data-fetch';
import { useUpdateCurrentLocation, useCurrentLocation } from 'data-fetch/use-current-location';
import { TeamBox } from './team-box';
import { CreateTeamModal } from 'components/modals';
import { LoadingComponent } from 'components/loading';

const lastTeamUserJoinId = localStorage.getItem('lastTeamUserJoinId');
interface Props {
  toggleIsSidebarOpen(): void;
}
export const SelectWorkspace: FC<Props> = ({ toggleIsSidebarOpen }) => {
  const currentLocation = useCurrentLocation();
  const updateTeamUserJoinId = useUpdateCurrentLocation();
  const { data, loading } = useMyTeams({
    fetchPolicy: 'cache-and-network',
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

  const goHome = useCallback(() => {
    updateTeamUserJoinId({ variables: { nextCurrentLocation: { currentTeamUserJoinId: null } } });
    toggleIsSidebarOpen();
  }, [toggleIsSidebarOpen, updateTeamUserJoinId]);
  const updateTeamUserJoinIdTrigger = useCallback(
    (teamUserJoinId: string) => {
      updateTeamUserJoinId({
        variables: {
          nextCurrentLocation: {
            currentTeamUserJoinId: teamUserJoinId,
          },
        },
      });
      toggleIsSidebarOpen();
    },
    [toggleIsSidebarOpen, updateTeamUserJoinId],
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
      <TeamBox selected={data?.currentLocation.currentTeamUserJoinId === null} onClick={goHome}>
        H
      </TeamBox>
      {data &&
        data.myTeams.map(teamUserJoin => (
          <TeamBox
            key={teamUserJoin._id}
            selected={data.currentLocation.currentTeamUserJoinId === teamUserJoin._id}
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
