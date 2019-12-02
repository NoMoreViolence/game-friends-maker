import React, { FC, useMemo } from 'react';
import { Row } from 'ui';
import MyTeamItem from '../../components/my-team-item';
import { UserFull, UserFull_teams } from 'graphqls/fragments/__generated__/UserFull';
import CreateTeamButtonComponent from '../../components/create-team-button';

interface Props {
  user: UserFull;
  myTeams: UserFull_teams[];
}

const MyTeams: FC<Props> = props => {
  const { myTeams } = props;
  const teamsRenderer = useMemo(
    () => (myTeams ? myTeams.map(team => <MyTeamItem key={team._id} team={team} />) : null),
    [myTeams],
  );

  return (
    <Row pl={16} pr={16} flexWrap="wrap">
      <CreateTeamButtonComponent />
      {teamsRenderer}
    </Row>
  );
};

export default MyTeams;
