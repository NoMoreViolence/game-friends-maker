import { useMutation } from '@apollo/react-hooks';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import { Loading } from 'components/loading';
import { Modal } from 'components/modal';
import { CREATE_TEAM } from 'graphqls/mutations/CREATE_TEAM';
import { useUpdateTeamUserJoinId } from 'graphqls/mutations/UPDATE_TEAM_USER_JOIN_ID';
import { CreateTeam, CreateTeamVariables } from 'graphqls/mutations/__generated__/CreateTeam';
import { MY_TEAM_USER_JOINS } from 'graphqls/queries/MY_TEAM_USER_JOINS';
import { MyTeamUserJoins } from 'graphqls/queries/__generated__/MyTeamUserJoins';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, fontWeights, Row, Span24, TextInput, YScroll } from 'ui';

interface Props {
  display: boolean;
  exit(): void;
}
export const CreateTeamModal: FC<Props> = ({ display, exit }) => {
  const updateTeamUserJoinId = useUpdateTeamUserJoinId();

  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = useMemo(() => {
    if (!teamDescription || !teamName || isLoading) {
      return true;
    }
    return false;
  }, [isLoading, teamDescription, teamName]);

  const [createTeam] = useMutation<CreateTeam, CreateTeamVariables>(CREATE_TEAM);
  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    await createTeam({
      variables: {
        createTeamPayload: {
          name: teamName,
          introduction: teamDescription,
        },
      },
      update: (cache, { data: mutationData }) => {
        const prevListData = cache.readQuery<MyTeamUserJoins>({
          query: MY_TEAM_USER_JOINS,
        });
        if (prevListData && mutationData) {
          const { myTeamUserJoins } = prevListData;
          const { createTeam: newMyTeam } = mutationData;
          cache.writeQuery<MyTeamUserJoins>({
            query: MY_TEAM_USER_JOINS,
            data: {
              myTeamUserJoins: [...myTeamUserJoins, newMyTeam],
            },
          });
          updateTeamUserJoinId(newMyTeam._id);
        }
      },
    });
    setIsLoading(false);
    exit();
  }, [createTeam, teamName, teamDescription, exit, updateTeamUserJoinId]);

  useEffect(() => {
    setTeamName('');
    setTeamDescription('');
  }, [display]);

  return (
    <Modal display={display} exit={exit}>
      <Loading isLoading={isLoading} />
      <Row pr={16} pl={16} pt={16} pb={16} justifyContent="space-between" alignItems="center">
        <CloseIcon cursor="pointer" onClick={exit} />
        <Span24 fontWeight={fontWeights.bold} flex={1}>
          Create team
        </Span24>

        <Row alignItems="center"></Row>
      </Row>

      <YScroll>
        <Col pr={16} pl={16} pt={32} alignItems="stretch" isReversed>
          <TextInput text={teamName} onChangeText={setTeamName} placeholder="Set your team name" />
        </Col>
        <Col pr={16} pl={16} pt={32} alignItems="stretch" isReversed>
          <TextInput text={teamDescription} onChangeText={setTeamDescription} placeholder="What for ?" />
        </Col>
      </YScroll>

      <Row justifyContent="flex-end" pt={16} pb={16} pr={16} pl={16}>
        <Button size="large" text="Start" onClick={onSubmit} isDisabled={isDisabled} type="black" />
      </Row>
    </Modal>
  );
};
