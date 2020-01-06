import React, { FC, useState, useCallback } from 'react';
import { Row, fontWeights, Span18 } from 'ui';
import { ApolloQueryResult } from 'apollo-boost';
import { Icon, iconMap } from 'helpers';
import { TeamItemContainer, TeamItemBox } from '../styled';
import { MyTeams } from 'graphqls/queries/__generated__/MyTeams';
import CreateTeamModal from './create-team-modal';

interface Props {
  refetchMyTeams: (variables?: Record<string, any> | undefined) => Promise<ApolloQueryResult<MyTeams>>;
}

const CreateTeamButtonComponent: FC<Props> = ({ refetchMyTeams }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <TeamItemContainer pr={8} pl={8} pt={8} pb={150}>
      <TeamItemBox
        onClick={openModal}
        isFlex
        flexDirection="column"
        boxSizing="border-box"
        borderRadius={8}
        pt={8}
        pb={8}
        pr={8}
        pl={8}
        transition={0.25}
        boxShadow="0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
        pointer
      >
        <Row flex={1} justifyContent="center" alignItems="center">
          <Span18 pr={4} fontWeight={fontWeights.bold}>
            팀 모집하기
          </Span18>
          <Icon iconSize={24} iconClass={iconMap.plus} />
        </Row>
      </TeamItemBox>
      <CreateTeamModal isOpen={isModalOpen} close={closeModal} refetchMyTeams={refetchMyTeams} />
    </TeamItemContainer>
  );
};

export default CreateTeamButtonComponent;
