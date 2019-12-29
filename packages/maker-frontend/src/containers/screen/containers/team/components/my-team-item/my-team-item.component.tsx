import React, { FC } from 'react';
import { getGameLogoUrl, GetGameLogoUrl } from 'lib';
import {} from 'graphqls/fragments/__generated__/UserFull';

import { Col, fontWeights, Img, Span18, Span16 } from 'ui';
import { TeamItemContainer, TeamItemBox } from '../styled';
import { MyTeams_myTeams } from 'graphqls/queries/__generated__/MyTeams';

interface Props {
  teamUserJoin: MyTeams_myTeams;
}

const TeamItem: FC<Props> = props => {
  const {
    teamUserJoin: { teamId },
  } = props;

  return (
    <TeamItemContainer pr={8} pl={8} pt={8} pb={150}>
      <TeamItemBox
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
        <Img src={getGameLogoUrl(teamId.gameId.name as keyof GetGameLogoUrl)} alt={teamId.gameId.name} />
        <Col width="100%" flex={1} pt={12} alignItems="unset">
          <Span18 textAlign="left" fontWeight={fontWeights.bold} pb={12}>
            {teamId.name}
          </Span18>
          <Span16>{teamId.introduction}</Span16>
        </Col>
      </TeamItemBox>
    </TeamItemContainer>
  );
};

export default TeamItem;
