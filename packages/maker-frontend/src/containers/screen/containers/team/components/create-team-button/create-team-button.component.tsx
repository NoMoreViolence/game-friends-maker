import React, { FC, useState, useCallback } from 'react';
import { Row, fontWeights, Span18 } from 'ui';
import { TeamItemContainer, TeamItemBox } from '../styled';
import CreateTeamModal from './create-team-modal';
import { Icon, iconMap } from 'helpers';

interface Props {}

const CreateTeamButtonComponent: FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <TeamItemContainer pr={8} pl={8} pt={8} pb={24}>
      <TeamItemBox onClick={openModal} pointer>
        <Row flex={1} justifyContent="center" alignItems="center">
          <Span18 pr={4} fontWeight={fontWeights.bold}>
            팀 모집하기
          </Span18>
          <Icon iconSize={24} iconClass={iconMap.plus} />
        </Row>
      </TeamItemBox>
      <CreateTeamModal isOpen={isModalOpen} close={closeModal} />
    </TeamItemContainer>
  );
};

export default CreateTeamButtonComponent;
