import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import React, { FC } from 'react';
import { useMyUserChannelJoins } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import { Row, Span18, Colors, Col, Span14 } from 'ui';
// import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';

interface Props {
  currentTeamUserJoin: TeamUserJoinFull;
}
export const ChannelSelect: FC<Props> = ({ currentTeamUserJoin }) => {
  // const currentUserChannelJoinId = useCurrentUserChannelJoinId()
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
        <Span14>Channels</Span14>
      </Row>
      <Col alignItems="stretch">
        {userChannelJoins &&
          userChannelJoins.map(userChannelJoins => (
            <Row
              key={userChannelJoins.channel._id}
              justifyContent="flex-start"
              pointer
              pt={12}
              pb={12}
              pr={16}
              pl={16}
              backgroundColor={Colors.secondary}
              transition={0.25}
            >
              {userChannelJoins.channel.name}
            </Row>
          ))}
      </Col>
    </>
  );
};
