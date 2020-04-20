import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useMyUserChannelJoins } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import { useTeamUserJoins } from 'graphqls/queries/USER_TEAM_JOINS';
import { TeamUserJoins_teamUserJoins } from 'graphqls/queries/__generated__/TeamUserJoins';
import React, { FC, useCallback } from 'react';
import { Col, Colors, Row, Span14, Span18 } from 'ui';

interface Props {
  currentTeamUserJoin: TeamUserJoinFull;
  closeDrawer(): void;
}
export const ChannelSelect: FC<Props> = ({ currentTeamUserJoin, closeDrawer }) => {
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const updateUserChannelJoinId = useUpdateUserChannelJoinId();

  const { data: myUserChannelJoinsData } = useMyUserChannelJoins(currentTeamUserJoin);
  const userChannelJoins = myUserChannelJoinsData?.myUserChannelJoins;

  const { data: teamUserJoinsData } = useTeamUserJoins({
    variables: {
      getTeamUserJoinPayload: {
        userId: currentTeamUserJoin.userId,
        teamId: currentTeamUserJoin.teamId,
      },
    },
  });
  const teamUserJoins = teamUserJoinsData?.teamUserJoins;

  return (
    <>
      <Row height={64} pl={16} pr={16} justifyContent="space-between" alignItems="center">
        <Row flex={1} pr={12} pl={12} pt={12} pb={12}>
          <Span18>{currentTeamUserJoin.team.name}</Span18>
        </Row>
      </Row>
      <Row pt={20} pb={8} pl={16} pr={16}>
        <Span14 color={Colors.grayScale.dark}>Channels</Span14>
      </Row>
      <Col alignItems="stretch">
        {userChannelJoins?.map((userChannelJoin) => (
          <ChannelBox
            key={userChannelJoin._id}
            currentUserChannelJoinId={currentUserChannelJoinId}
            userChannelJoin={userChannelJoin}
            updateUserChannelJoinId={updateUserChannelJoinId}
            closeDrawer={closeDrawer}
          />
        ))}
      </Col>
      <Row pt={20} pb={8} pl={16} pr={16}>
        <Span14 color={Colors.grayScale.dark}>Members</Span14>
      </Row>
      <Col alignItems="stretch">
        {teamUserJoins?.map((teamUserJoin) => (
          <MemberBox key={teamUserJoin._id} teamUserJoin={teamUserJoin} />
        ))}
      </Col>
    </>
  );
};

interface ChannelBoxProps {
  updateUserChannelJoinId(id: string): void;
  currentUserChannelJoinId: string | null;
  userChannelJoin: UserChannelJoinFull;
  closeDrawer(): void;
}
const ChannelBox: FC<ChannelBoxProps> = ({
  userChannelJoin,
  currentUserChannelJoinId,
  updateUserChannelJoinId,
  closeDrawer,
}) => {
  const onChannelClick = useCallback(() => {
    updateUserChannelJoinId(userChannelJoin._id);
    closeDrawer();
  }, [closeDrawer, updateUserChannelJoinId, userChannelJoin._id]);

  return (
    <Row
      onClick={onChannelClick}
      justifyContent="flex-start"
      pointer
      pt={12}
      pb={12}
      pr={16}
      pl={16}
      backgroundColor={currentUserChannelJoinId === userChannelJoin._id ? Colors.secondary : Colors.white}
      transition={0.25}
    >
      <Span14 color={currentUserChannelJoinId === userChannelJoin._id ? Colors.white : Colors.black}>
        {userChannelJoin.channel.name}
      </Span14>
    </Row>
  );
};

interface MemberBoxProps {
  teamUserJoin: TeamUserJoins_teamUserJoins;
}
const MemberBox: FC<MemberBoxProps> = ({ teamUserJoin }) => (
  <Row justifyContent="flex-start" pt={12} pb={12} pr={16} pl={16} transition={0.25}>
    {teamUserJoin.user.name}
  </Row>
);
