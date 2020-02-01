import { useMutation } from '@apollo/react-hooks';
import { Loading } from 'components/loading';
import { Modal } from 'components/modal';
import { gameOptions, SelectOption } from 'constants-frontend';
import { CREATE_TEAM } from 'graphqls/mutations/CREATE_TEAM';
import { useUpdateTeamUserJoinId } from 'graphqls/mutations/UPDATE_TEAM_USER_JOIN_ID';
import { CreateTeam, CreateTeamVariables } from 'graphqls/mutations/__generated__/CreateTeam';
import { MyTeamUserJoins } from 'graphqls/queries/__generated__/MyTeamUserJoins';
import { Icon, iconMap, useFocusAndFocusOut } from 'helpers';
import { toast } from 'lib';
import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { color } from 'styles';
import { Col, fontWeights, Label14, Row, Select, Span16, Span18, Textarea, TextInput, YScroll } from 'ui';
import { MY_TEAM_USER_JOINS } from 'graphqls/queries/MY_TEAM_USER_JOINS';

interface Props {
  isOpen?: boolean;
  close?: (created?: boolean) => any;
}
export const CreateTeamModal: FC<Props> = ({ isOpen = false, close = () => null }) => {
  const handleClose = useCallback(
    (e?: boolean | React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (typeof e === 'boolean' && e) {
        close(true);
      } else {
        close();
      }
    },
    [close],
  );
  const updateTeamUserJoinId = useUpdateTeamUserJoinId();
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [gameOnFocus, gameOnBlur, gameLabelColor] = useFocusAndFocusOut(color['border-gray'], color.mainColorDark);
  const [gameName, setGameName] = useState<SelectOption | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isReadyToSubmit = useMemo(
    () =>
      gameName !== null && gameName !== undefined && teamName
        ? { name: teamName, gameName: gameName.value, introduction: teamDescription }
        : null,
    [gameName, teamDescription, teamName],
  );

  const [createTeam] = useMutation<CreateTeam, CreateTeamVariables>(CREATE_TEAM);

  const onSubmit = useCallback(async () => {
    if (isReadyToSubmit) {
      setIsLoading(true);
      await createTeam({
        variables: {
          createTeamPayload: isReadyToSubmit,
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
      handleClose(true);
    } else {
      toast('warning', '폼 양식 오류', '제목과 게임을 선택해 주세요');
    }
  }, [isReadyToSubmit, createTeam, handleClose, updateTeamUserJoinId]);

  useEffect(() => {
    setTeamName('');
    setTeamDescription('');
  }, [isOpen]);

  return (
    <Modal display={isOpen} exit={handleClose}>
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
        <Icon onClick={handleClose} pointer={true} mr={16} iconClass={iconMap.close} iconSize={24} />
        <Span16 fontWeight={fontWeights.bold} flex={1}>
          팀 생성하기
        </Span16>

        <Row alignItems="center">
          <Span18
            hoverDisabled={!isReadyToSubmit}
            transition={0.25}
            color={color.mainColorLight}
            hoverColor={color.mainColor}
            pointer={!!isReadyToSubmit}
            padding={4}
            fontWeight={fontWeights.bold}
            onClick={onSubmit}
          >
            모집시작
          </Span18>
        </Row>
      </Row>

      <YScroll>
        <Col pr={16} pl={16} pt={32} alignItems="stretch" isReversed>
          <TextInput
            id="team-name"
            transition={0.25}
            focusBorderColor={color.mainColorDark}
            text={teamName}
            onChangeText={setTeamName}
            pt={8}
            pb={8}
            pr={16}
            pl={16}
            placeholder="Set your team name"
            borderColor={color['border-gray']}
          />
          <StyledLabel
            htmlFor="team-name"
            mb={8}
            transition={0.25}
            fontWeight={fontWeights.normal}
            color={color['border-gray']}
          >
            팀 이름
          </StyledLabel>
        </Col>
        <Col pr={16} pl={16} pt={16} alignItems="stretch" isReversed>
          <Select
            onChange={e => setGameName(e as SelectOption)}
            placeholder="게임을 선택하세요"
            onFocus={gameOnFocus}
            onBlur={gameOnBlur}
            styles={customStyles}
            theme={setSelectTheme}
            isSearchable={false}
            loadOptions={() => new Promise(resolve => resolve(gameOptions))}
          />
          <StyledLabel mb={8} transition={0.25} fontWeight={fontWeights.normal} color={gameLabelColor} flex={1}>
            게임 선택하기
          </StyledLabel>
        </Col>
        <Col pr={16} pl={16} pt={16} pb={16} alignItems="stretch" isReversed>
          <Textarea
            height={50}
            responsiveHeight={true}
            resize={false}
            id="team-name"
            text={teamDescription}
            onChangeText={setTeamDescription}
            transition={0.25}
            focusBorderColor={color.mainColorDark}
            pt={8}
            pb={8}
            pr={16}
            pl={16}
            placeholder="팀 소개를 해 주세요"
            borderColor={color['border-gray']}
          />
          <StyledLabel
            htmlFor="team-name"
            mb={8}
            transition={0.25}
            fontWeight={fontWeights.normal}
            color={color['border-gray']}
          >
            팀 소개 글 작성하기
          </StyledLabel>
        </Col>
      </YScroll>
    </Modal>
  );
};

const StyledLabel = styled(Label14)`
  input:focus ~ & {
    color: ${color.mainColorDark};
  }
  textarea:focus ~ & {
    color: ${color.mainColorDark};
  }
`;

const customStyles = {
  control: (base: CSSProperties, state: { hasValue: boolean }) => {
    return {
      ...base,
      borderRadius: '2px',
    };
  },
  menu: (base: CSSProperties, state: { getValue: () => string }) => ({
    ...base,
  }),
  menuList: (base: CSSProperties) => ({
    ...base,
    borderRadius: '2px',
    maxHeight: '150px',
  }),
  menuPortal: (base: CSSProperties) => ({
    ...base,
    borderRadius: '2px',
    maxHeight: '150px',
  }),
};
const setSelectTheme = (theme: any) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: color.mainColorLight,
    primary: color.mainColor,
  },
});
