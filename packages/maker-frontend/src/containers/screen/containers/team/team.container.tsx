import React, { FC } from 'react';
import { useUserState } from 'context';
import MyTeams from './containers/my-teams';
import { UserFull } from 'graphqls/fragments/__generated__/UserFull';
import { Span36 } from 'ui/typo';
import { fontWeights } from 'ui';

interface Props {}
const TeamContainer: FC<Props> = () => {
  const { user } = useUserState();

  return (
    <>
      <Span36 mr={16} ml={16} mt={48} mb={48} fontWeight={fontWeights.bold}>
        나의 팀 모집
      </Span36>
      {user && user._id !== '' && <RenderWithUserFull user={user} />}
    </>
  );
};

interface RenderWithUserFullProps {
  user: UserFull;
}
const RenderWithUserFull: FC<RenderWithUserFullProps> = ({ user }) => <MyTeams user={user} />;

export default TeamContainer;
