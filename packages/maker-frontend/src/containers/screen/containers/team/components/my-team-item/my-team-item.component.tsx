import React, { FC } from 'react';
import dayjs from 'dayjs';
import { getGameLogoUrl, GetGameLogoUrl } from 'lib';
import { UserFull_teams } from 'graphqls/fragments/__generated__/UserFull';

import { Col, fontWeights } from 'ui';
import { Span2rem, Span1rem, SpanD875rem } from 'styles';
import { TeamItemContainer, TeamItemBox } from '../styled';

interface Props {
  team: UserFull_teams;
}

const TeamItem: FC<Props> = props => {
  const {
    team: { name, gameId, introduction, createdAt },
  } = props;

  return (
    <TeamItemContainer pr={8} pl={8} pt={8} pb={24}>
      <TeamItemBox>
        <img width="150" height="150" src={getGameLogoUrl(gameId.name as keyof GetGameLogoUrl)} alt={name} />

        <Col flex={1} alignItems="unset">
          <Span2rem weight={fontWeights.bold} mb={12}>
            {name}
          </Span2rem>
          <Span1rem isEllipsisEnabled={true}>{introduction}</Span1rem>
        </Col>

        <SpanD875rem>{dayjs(createdAt).format('YYYY / MM / DD')}</SpanD875rem>
      </TeamItemBox>
    </TeamItemContainer>
  );
};

export default TeamItem;
