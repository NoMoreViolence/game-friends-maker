import { useMutation } from '@apollo/react-hooks';
import { Loading } from 'components/loading';
import { Modal } from 'components/modal';
import { gameList } from 'constants-frontend';
import { CREATE_TEAM } from 'graphqls/mutations/CREATE_TEAM';
import { useUpdateTeamUserJoinId } from 'graphqls/mutations/UPDATE_TEAM_USER_JOIN_ID';
import { CreateTeam, CreateTeamVariables } from 'graphqls/mutations/__generated__/CreateTeam';
import { MY_TEAM_USER_JOINS } from 'graphqls/queries/MY_TEAM_USER_JOINS';
import { MyTeamUserJoins } from 'graphqls/queries/__generated__/MyTeamUserJoins';
import { Icon, iconMap } from 'helpers';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, fontWeights, Row, Select, Span24, TextInput, YScroll } from 'ui';

interface Props {
  display: boolean;
  exit(): void;
}
export const CreateTeamModal: FC<Props> = ({ display, exit }) => {
  const updateTeamUserJoinId = useUpdateTeamUserJoinId();

  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [gameName, setGameName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = useMemo(() => {
    if (!gameName || !teamDescription || !teamName || isLoading) {
      return true;
    }
    return false;
  }, [gameName, isLoading, teamDescription, teamName]);

  const [createTeam] = useMutation<CreateTeam, CreateTeamVariables>(CREATE_TEAM);
  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    await createTeam({
      variables: {
        createTeamPayload: {
          gameName,
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
  }, [createTeam, gameName, teamName, teamDescription, exit, updateTeamUserJoinId]);

  useEffect(() => {
    setTeamName('');
    setTeamDescription('');
    setGameName('');
  }, [display]);

  return (
    <Modal display={display} exit={exit}>
      <Loading isLoading={isLoading} />
      <Row
        boxShadow="rgba(41, 41, 41, 0.05) 0px 4px 7px;"
        pr={16}
        pl={16}
        pt={16}
        pb={16}
        justifyContent="space-between"
        alignItems="center"
      >
        <CloseIcon cursor="pointer" onClick={exit} />
        <Icon onClick={exit} pointer={true} mr={16} iconClass={iconMap.close} iconSize={24} />
        <Span24 fontWeight={fontWeights.bold} flex={1}>
          Create team
        </Span24>

        <Row alignItems="center"></Row>
      </Row>

      <YScroll>
        <Col pr={16} pl={16} pt={32} alignItems="stretch" isReversed>
          <TextInput text={teamName} onChangeText={setTeamName} placeholder="Set your team name" />
        </Col>
        <Col pr={16} pl={16} pt={16} alignItems="stretch" isReversed>
          <Select
            value={gameName}
            label="Select your game team"
            labelId="filter-team"
            select={(value) => (typeof value === 'string' ? setGameName(value) : {})}
            list={gameList}
          />
        </Col>
        <Col pr={16} pl={16} pt={32} alignItems="stretch" isReversed>
          <TextInput text={teamDescription} onChangeText={setTeamDescription} placeholder="What for ?" />
        </Col>
      </YScroll>

      <Row justifyContent="flex-end" pt={16} pb={16} pr={16} pl={16}>
        <Button size="large" text="Start" onClick={onSubmit} isDisabled={isDisabled} type="primary" />
      </Row>
    </Modal>
  );
};
