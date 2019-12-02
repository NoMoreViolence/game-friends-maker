import React, { FC } from 'react';
import { TeamItemContainer, TeamItemBox } from '../styled';
import { Col, fontWeights } from 'ui';
import { Span2rem } from 'styles';

interface Props {}

const CreateTeamButtonComponent: FC<Props> = () => (
  <TeamItemContainer pr={8} pl={8} pt={8} pb={24}>
    <TeamItemBox>
      <Col flex={1} justifyContent="center" alignItems="center">
        <Span2rem weight={fontWeights.bold}>내 팀 생성하기 +</Span2rem>
      </Col>
    </TeamItemBox>
  </TeamItemContainer>
);

export default CreateTeamButtonComponent;
