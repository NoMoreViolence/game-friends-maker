import React, { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row } from 'ui';
import MyTeamItem from '../../components/my-team-item';
import CreateTeamButtonComponent from '../../components/create-team-button';
import { UserFull } from 'graphqls/fragments/__generated__/UserFull';
import { MY_TEAMS } from 'graphqls/queries/MY_TEAMS';
import { MyTeams } from 'graphqls/queries/__generated__/MyTeams';

interface Props {
  user: UserFull;
}

const MyTeamsComponent: FC<Props> = ({ user }) => {
  const { data, refetch } = useQuery<MyTeams>(MY_TEAMS);

  return (
    <Row pl={16} pr={16} flexWrap="wrap" position="relative">
      <CreateTeamButtonComponent refetchMyTeams={refetch} />
      {data && data.myTeams.map(team => <MyTeamItem key={team._id} teamUserJoin={team} />)}
    </Row>
  );
};

export default MyTeamsComponent;
