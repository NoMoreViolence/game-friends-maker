import React, { FC } from 'react';
import { Span3rem } from 'styles';
import MyPosts from './containers/my-posts';
// import { useUserState } from 'context';

interface Props {}

const PostContainer: FC<Props> = () => {
  // const user = useUserState();

  return (
    <>
      <Span3rem mt={48} mb={48} weight="bold">
        나의 모집
      </Span3rem>
      <MyPosts />
    </>
  );
};

export default PostContainer;
