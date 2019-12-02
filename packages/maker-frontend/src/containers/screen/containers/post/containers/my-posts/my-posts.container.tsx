import React, { FC, useMemo } from 'react';
import { Row } from 'ui';
import MyPostItem from '../../components/my-post-item';
import { UserFull, UserFull_posts } from 'graphqls/fragments/__generated__/UserFull';
import CreatePostButtonComponent from '../../components/create-post-button';

interface Props {
  user: UserFull;
  myPosts: UserFull_posts[];
}

const MyPosts: FC<Props> = props => {
  const { myPosts } = props;
  const postsRenderer = useMemo(
    () => (myPosts ? myPosts.map(post => <MyPostItem key={post._id} post={post} />) : null),
    [myPosts],
  );

  return (
    <Row pl={16} pr={16} flexWrap="wrap">
      <CreatePostButtonComponent />
      {postsRenderer}
    </Row>
  );
};

export default MyPosts;
