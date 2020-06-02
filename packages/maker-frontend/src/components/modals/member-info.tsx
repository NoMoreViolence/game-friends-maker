import CloseIcon from '@material-ui/icons/CloseOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import { TeamUserJoinWithUser } from 'graphqls/fragments/__generated__/TeamUserJoinWithUser';
import React, { FC, useCallback } from 'react';
import { useCopyToClipboard } from 'react-use';
import { Col, Colors, fontWeights, Modal, Row, Span12, Span16, Span18, Span24 } from 'ui';

interface Props {
  display: TeamUserJoinWithUser | null;
  exit(): void;
}
export const MemberInfoModal: FC<Props> = ({ display: teamUserJoin, exit }) => {
  const [clipboardState, copyToClipboard] = useCopyToClipboard();
  const copyEmail = useCallback(() => {
    if (teamUserJoin) {
      copyToClipboard(teamUserJoin.user.email ?? '');
    }
  }, [copyToClipboard, teamUserJoin]);

  return (
    <Modal display={teamUserJoin !== null} exit={exit} width={['100%', '100%', 350]} padding={16}>
      <Row justifyContent="space-between" alignItems="center">
        <Span24 fontWeight={fontWeights.semiBold}>Team Member Info</Span24>
        <CloseIcon fontSize="large" cursor="pointer" onClick={exit} />
      </Row>

      <Row mt={24} justifyContent="flex-start">
        <Span18>{teamUserJoin?.user.name}</Span18>
      </Row>
      <Row mt={12} justifyContent="stretch" border={`0.5px solid ${Colors.gray}`} />

      <Col mt={12} justifyContent="stretch" alignItems="flex-start">
        <Span16>{teamUserJoin?.muted ? 'snooze' : 'always awake'}</Span16>
        <Span12 color={Colors.gray} mt="4px">
          Alert Status
        </Span12>
      </Col>
      <Row mt={12} justifyContent="stretch" border={`0.5px solid ${Colors.gray}`} />

      <Col mt={12} justifyContent="stretch" alignItems="flex-start">
        <Span16>
          {teamUserJoin?.displayName} ({teamUserJoin?.user.name})
        </Span16>
        <Span12 color={Colors.gray} mt="4px">
          Display name
        </Span12>
      </Col>
      <Row mt={12} justifyContent="stretch" border={`0.5px solid ${Colors.gray}`} />

      <Col mt={12} justifyContent="stretch" alignItems="stretch">
        <Span16 textAlign="left">
          {teamUserJoin?.user.email} <FileCopyIcon fontSize="small" cursor="pointer" onClick={copyEmail} />
        </Span16>
        <Row justifyContent="space-between" alignItems="center" mt="4px">
          <Span12 color={Colors.gray}>Email address</Span12>
          {clipboardState.value === teamUserJoin?.user.email && <Span12 color={Colors.black}>Copied !</Span12>}
        </Row>
      </Col>
    </Modal>
  );
};
