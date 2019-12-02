import React, { FC } from 'react';
import dayjs from 'dayjs';
import { getGameLogoUrl, GetGameLogoUrl } from 'lib';
import { UserFull_posts } from 'graphqls/fragments/__generated__/UserFull';

import { Col, fontWeights } from 'ui';
import { Span2rem, Span1rem, SpanD875rem } from 'styles';
import { PostItemContainer, PostItemBox } from '../styled';

interface Props {
  post: UserFull_posts;
}

const PostItem: FC<Props> = props => {
  const {
    post: { name, gameId, introduction, createdAt },
  } = props;

  return (
    <PostItemContainer pr={8} pl={8} pt={8} pb={24}>
      <PostItemBox>
        <img width="150" height="150" src={getGameLogoUrl(gameId.name as keyof GetGameLogoUrl)} alt={name} />

        <Col flex={1} alignItems="unset">
          <Span2rem weight={fontWeights.bold} mb={12}>
            {name}
          </Span2rem>
          <Span1rem isEllipsisEnabled={true}>{introduction}</Span1rem>
        </Col>

        <SpanD875rem>{dayjs(createdAt).format('YYYY / MM / DD')}</SpanD875rem>
      </PostItemBox>
    </PostItemContainer>
  );
};

export default PostItem;
