import AddIcon from '@material-ui/icons/AddOutlined';
import { MemberInfoModal } from 'components/modals';
import { TeamUserJoinFull } from 'graphqls/fragments/__generated__/TeamUserJoinFull';
import { UserChannelJoinFull } from 'graphqls/fragments/__generated__/UserChannelJoinFull';
import { useUpdateUserChannelJoinId } from 'graphqls/mutations/UPDATE_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoinId } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { useCurrentUserChannelJoin, useMyUserChannelJoins } from 'graphqls/queries/MY_USER_CHANNEL_JOINS';
import { useTeamMembers } from 'graphqls/queries/TEAM_USER_JOINS';
import { TeamUserJoins_teamUserJoins } from 'graphqls/queries/__generated__/TeamUserJoins';
import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { InviteModal } from './invite-modal';
import { Col, Colors, Row, Span14, Span18 } from 'ui';

interface Props {
  currentTeamUserJoin: TeamUserJoinFull;
  closeDrawer(): void;
}
export const ChannelSelect: FC<Props> = ({ currentTeamUserJoin, closeDrawer }) => {
  const currentUserChannelJoinId = useCurrentUserChannelJoinId();
  const currentUserChannelJoin = useCurrentUserChannelJoin(currentTeamUserJoin, currentUserChannelJoinId);
  const updateUserChannelJoinId = useUpdateUserChannelJoinId();

  const { data: myUserChannelJoinsData } = useMyUserChannelJoins(currentTeamUserJoin);
  const userChannelJoins = myUserChannelJoinsData?.myUserChannelJoins;
  const teamMembers = useTeamMembers(currentTeamUserJoin);

  const [displayInviteModal, setDisplayInviteModal] = useState(false);
  const openInviteModal = useCallback(() => setDisplayInviteModal(true), []);
  const closeInviteModal = useCallback(() => setDisplayInviteModal(false), []);

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

      <Row justifyContent="space-between" pt={20} pb="8px" pl={16} pr={16}>
        <Span14 color={Colors.grayScale.dark}>Channel Members</Span14>
        <AddIcon fontSize="small" cursor="pointer" onClick={openInviteModal} />
      </Row>
      <Col alignItems="stretch">
        {teamMembers?.map((teamUserJoin) => (
          <MemberBox key={teamUserJoin._id} teamUserJoin={teamUserJoin} showMemberInfo={openMemberInfoModal} />
        ))}
      </Col>

      <MemberInfoModal display={displayMemberInfoModal} exit={closeMemberInfoModal} />
      {currentUserChannelJoin && (
        <InviteModal display={displayInviteModal} exit={closeInviteModal} userChannelJoin={currentUserChannelJoin} />
      )}
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
    <StyledRow onClick={onClick} justifyContent="flex-start" cursor="pointer" pt={12} pb={12} pr={16} pl={16}>
      {teamUserJoin.user.name}
    </StyledRow>
  );
};

const StyledRow = styled(Row)`
  &:hover {
    background-color: ${Colors.gray};
  }
  transition: 0.25s;
`;
