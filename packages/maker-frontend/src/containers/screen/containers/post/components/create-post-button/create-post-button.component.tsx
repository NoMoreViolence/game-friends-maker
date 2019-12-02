import React, { FC } from 'react';
import { PostItemContainer, PostItemBox } from '../styled';
import { Col, fontWeights } from 'ui';
import { Span2rem } from 'styles';

interface Props {}

const CreatePostButtonComponent: FC<Props> = () => (
  <PostItemContainer pr={8} pl={8} pt={8} pb={24}>
    <PostItemBox>
      <Col flex={1} justifyContent="center" alignItems="center">
        <Span2rem weight={fontWeights.bold}>내 팀 생성하기 +</Span2rem>
      </Col>
    </PostItemBox>
  </PostItemContainer>
);

export default CreatePostButtonComponent;
