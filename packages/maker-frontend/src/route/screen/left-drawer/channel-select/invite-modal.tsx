import { MyUserChannelJoins_myUserChannelJoins } from 'graphqls/queries/__generated__/MyUserChannelJoins';
import React, { FC } from 'react';
import { Modal, Col, TextInput } from 'ui';
import { useUserChannelJoins } from 'graphqls/queries/USER_CHANNEL_JOINS';

interface Props {
  display: boolean;
  exit(): void;
  userChannelJoin: MyUserChannelJoins_myUserChannelJoins;
}
export const InviteModal: FC<Props> = ({ display, exit, userChannelJoin }) => {
  const { data } = useUserChannelJoins(userChannelJoin);
  const userChannelJoins = data?.userChannelJoins;

  console.log(userChannelJoins);
  return (
    <Modal display={display} exit={exit} width={['100%', '100%', 350]} height={['100%', '100%', 350]}>
      <Col>Invite Channel</Col>
      <Col>
        <TextInput />
      </Col>
      <Col></Col>
    </Modal>
  );
};
