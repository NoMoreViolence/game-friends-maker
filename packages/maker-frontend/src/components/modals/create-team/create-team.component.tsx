import React, { FC, useState, CSSProperties, useEffect, useCallback, useMemo } from 'react';
import { ApolloQueryResult } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { gameOptions, SelectOption } from 'constants-frontend';
import ModalComponent from 'components/modal';
import { Row, fontWeights, Col, Textarea, TextInput, Select, YScroll, Span16, Span18, Label14 } from 'ui';
import { Icon, iconMap, useFocusAndFocusOut } from 'helpers';
import { color } from 'styles';
import { MyTeams } from 'graphqls/queries/__generated__/MyTeams';
import { CreateTeam, CreateTeamVariables } from 'graphqls/mutations/__generated__/CreateTeam';
import { CREATE_TEAM } from 'graphqls/mutations/CREATE_TEAM';
import { LoadingComponent } from 'components/loading';
import { toast } from 'lib';

interface Props {
  isOpen?: boolean; // false
  close?: () => any;
  refetchMyTeams: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<MyTeams>>;
}

export const CreateTeamModal: FC<Props> = ({ isOpen, close, refetchMyTeams }) => {
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [gameOnFocus, gameOnBlur, gameLabelColor] = useFocusAndFocusOut(color['border-gray'], color.mainColorDark);
  const [gameName, setGameName] = useState<SelectOption | null | undefined>(null);
  const isReadyToSubmit = useMemo(
    () =>
      gameName !== null && gameName !== undefined && teamName
        ? { name: teamName, gameName: gameName.value, introduction: teamDescription }
        : null,
    [gameName, teamDescription, teamName],
  );

  const [createTeam, { loading }] = useMutation<CreateTeam, CreateTeamVariables>(CREATE_TEAM, {
    onCompleted({ createTeam: { team, teamUserJoin, user } }) {},
    onError() {},
  });

  const onSubmit = useCallback(() => {
    if (isReadyToSubmit) {
      createTeam({
        variables: {
          createTeamPayload: isReadyToSubmit,
        },
      }).finally(() => {
        refetchMyTeams();
        close && close();
      });
    } else {
      toast('warning', '폼 양식 오류', '제목과 게임을 선택해 주세요');
    }
  }, [isReadyToSubmit, createTeam, refetchMyTeams, close]);

  useEffect(() => {
    setTeamName('');
    setTeamDescription('');
  }, [isOpen]);

  return (
    <ModalComponent display={isOpen} exit={close}>
      <LoadingComponent isLoading={loading} />
      <Row
        boxShadow="rgba(41, 41, 41, 0.05) 0px 4px 7px;"
        pr={16}
        pl={16}
        pt={16}
        pb={16}
        justifyContent="space-between"
        alignItems="center"
      >
        <Icon onClick={close} pointer={true} mr={16} iconClass={iconMap.close} iconSize={24} />
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
    </ModalComponent>
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
