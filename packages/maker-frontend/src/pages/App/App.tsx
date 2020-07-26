import { useCurrentUserTeamId } from 'graphql/query/CURRENT_USER_TEAM_ID';
import React, { FC } from 'react';

export const App: FC = () => {
  const currentUserTeamId = useCurrentUserTeamId();

  console.log(currentUserTeamId);

  return <div></div>;
};
