import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import React, { FC, useCallback } from 'react';
import { useMyUserChannelJoins } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import { Row, Span18, Colors, Col, Span14 } from 'ui';
import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';

interface Props {
  currentTeamUserJoin: TeamUserJoinFull;
  closeDrawer(): void;
}
export const ChannelSelect: FC<Props> = ({ currentTeamUserJoin, closeDrawer }) => {
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const updateUserChannelJoinId = useUpdateUserChannelJoinId();
  const { data } = useMyUserChannelJoins(currentTeamUserJoin);
  const userChannelJoins = data?.myUserChannelJoins;

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
        {userChannelJoins?.map(userChannelJoin => (
          <ChannelBox
            key={userChannelJoin._id}
            currentUserChannelJoinId={currentUserChannelJoinId}
            userChannelJoin={userChannelJoin}
            updateUserChannelJoinId={updateUserChannelJoinId}
            closeDrawer={closeDrawer}
          />
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
      backgroundColor={currentUserChannelJoinId === userChannelJoin._id ? Colors.secondary : Colors.primary}
      transition={0.25}
    >
      {userChannelJoin.channel.name}
    </Row>
  );
};
