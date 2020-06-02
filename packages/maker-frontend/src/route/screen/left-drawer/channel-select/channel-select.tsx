import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useMyUserChannelJoins } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import React, { FC, useCallback, useState } from 'react';
import { Col, Colors, Row, Span14, Span18 } from 'ui';
import { useTeamMembers } from 'graphqls/queries/TEAM_USER_JOINS';
import { TeamUserJoins_teamUserJoins } from 'graphqls/queries/__generated__/TeamUserJoins';
import { MemberInfoModal } from 'components/modals';

interface Props {
  currentTeamUserJoin: TeamUserJoinFull;
  closeDrawer(): void;
}
export const ChannelSelect: FC<Props> = ({ currentTeamUserJoin, closeDrawer }) => {
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const updateUserChannelJoinId = useUpdateUserChannelJoinId();

  const { data: myUserChannelJoinsData } = useMyUserChannelJoins(currentTeamUserJoin);
  const userChannelJoins = myUserChannelJoinsData?.myUserChannelJoins;
  const teamMembers = useTeamMembers(currentTeamUserJoin);

  const [displayMemberInfoModal, setDisplayMemberInfoModal] = useState<TeamUserJoins_teamUserJoins | null>(null);
  const openMemberInfoModal = useCallback((info: TeamUserJoins_teamUserJoins) => setDisplayMemberInfoModal(info), []);
  const closeMemberInfoModal = useCallback(() => setDisplayMemberInfoModal(null), []);

  return (
    <>
      <Row height={64} pl={16} pr={16} justifyContent="space-between" alignItems="center">
        <Row justifyContent="flex-start" flex={1} pr={12} pl={12} pt={12} pb={12}>
          <Span18>{currentTeamUserJoin.team.name}</Span18>
        </Row>
      </Row>
      <Row justifyContent="flex-start" pt={20} pb="8px" pl={16} pr={16}>
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

      <Row justifyContent="flex-start" pt={20} pb="8px" pl={16} pr={16}>
        <Span14 color={Colors.grayScale.dark}>Members</Span14>
      </Row>
      <Col alignItems="stretch">
        {teamMembers?.map((teamUserJoin) => (
          <MemberBox key={teamUserJoin._id} teamUserJoin={teamUserJoin} showMemberInfo={openMemberInfoModal} />
        ))}
      </Col>

      <MemberInfoModal display={displayMemberInfoModal} exit={closeMemberInfoModal} />
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
      cursor="pointer"
      pt={12}
      pb={12}
      pr={16}
      pl={16}
      background={currentUserChannelJoinId === userChannelJoin._id ? Colors.gray : Colors.white}
    >
      <Span14 color={Colors.black}>{userChannelJoin.channel.name}</Span14>
    </Row>
  );
};

interface MemberBoxProps {
  teamUserJoin: TeamUserJoins_teamUserJoins;
  showMemberInfo(teamUserJoin: TeamUserJoins_teamUserJoins): void;
}
const MemberBox: FC<MemberBoxProps> = ({ teamUserJoin, showMemberInfo }) => {
  const onClick = useCallback(() => {
    showMemberInfo(teamUserJoin);
  }, [showMemberInfo, teamUserJoin]);

  return (
    <Row onClick={onClick} justifyContent="flex-start" cursor="pointer" pt={12} pb={12} pr={16} pl={16}>
      {teamUserJoin.user.name}
    </Row>
  );
};
