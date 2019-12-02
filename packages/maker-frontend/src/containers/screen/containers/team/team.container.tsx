import React, { FC } from 'react';
import { useUserState } from 'context';
import MyTeams from './containers/my-teams';
import { Span3rem } from 'styles';
import { UserFull } from 'graphqls/fragments/__generated__/UserFull';

interface Props {}

const TeamContainer: FC<Props> = () => {
  const { user } = useUserState();

  return (
    <>
      <Span3rem mr={16} ml={16} mt={48} mb={48} weight="bold">
        나의 팀 모집
      </Span3rem>
      {user && user._id !== '' && <RenderWithUserFull user={user} />}
    </>
  );
};

interface RenderWithUserFullProps {
  user: UserFull;
}
const RenderWithUserFull: FC<RenderWithUserFullProps> = props => {
  const { user } = props;

  return (
    <>
      <MyTeams user={user} myTeams={user.teams} />
    </>
  );
};

export default TeamContainer;
