import React, { useMemo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { AppState } from 'bootstrap';

import { PostsRootDiv } from './post-list.styled';
import PostItemComponent from './components/post-item';
import { Span3rem } from 'styles';
import { Row } from 'ui';

const PostListContainer = () => {
  // const dispatch = useDispatch();
  // const user = useSelector(({ user }: AppState) => user.userInfo);

  const posts = useSelector(({ post }: AppState) => post.postInfo.posts, shallowEqual);
  const myPosts = useSelector(({ post }: AppState) => post.postInfo.posts, shallowEqual);

  const renderPosts = useMemo(() => posts.map((post, idx) => <PostItemComponent key={idx} post={post} />), [posts]);
  const renderMyPosts = useMemo(() => myPosts.map((post, idx) => <PostItemComponent key={idx} post={post} />), [
    myPosts,
  ]);

  return (
    <PostsRootDiv>
      {renderMyPosts.length !== 0 && (
        <>
          <Row mt={96}></Row>
          <Span3rem>My posts</Span3rem>
          <Row flexWrap="wrap">{renderMyPosts}</Row>
        </>
      )}
      {renderPosts.length !== 0 && (
        <>
          <Row mt={96}></Row>
          <Span3rem>Find posts</Span3rem>
          <Row flexWrap="wrap">{renderPosts}</Row>
        </>
      )}
    </PostsRootDiv>
  );
};

export default PostListContainer;
