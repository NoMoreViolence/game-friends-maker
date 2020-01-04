import React, { FC } from 'react';
import { Row } from 'ui';
import MyTeamItem from '../../components/my-team-item';
import CreateTeamButtonComponent from '../../components/create-team-button';
import { UserFull } from 'graphqls/fragments/__generated__/UserFull';
import { useMyTeams } from 'data-fetch';

interface Props {
  user: UserFull;
}

const MyTeamsComponent: FC<Props> = ({ user }) => {
  const { data, refetch } = useMyTeams();

  return (
    <Row pl={16} pr={16} flexWrap="wrap" position="relative">
      <CreateTeamButtonComponent refetchMyTeams={refetch} />
      {data && data.myTeams.map(team => <MyTeamItem key={team._id} teamUserJoin={team} />)}
    </Row>
  );
};

export default MyTeamsComponent;
