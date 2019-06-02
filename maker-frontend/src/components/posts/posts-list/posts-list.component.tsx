import React, { Component, Fragment } from 'react';
import { PostsListComponentProps, PostsListComponentMethod } from '@containers/posts/posts-list/posts-list.container';
import { PostUnit } from '@models';
import { EmptyPost } from './posts-list.styled';

type Props = PostsListComponentProps & PostsListComponentMethod;

class PostsListComponent extends Component<Props> {
  componentDidMount() {}

  render() {
    const { posts } = this.props;
    const renderPosts = (units: PostUnit[]) => posts.map((post, idx) => <div key={1}>FUCK YOY</div>);

    return (
      <Fragment>
        {posts.length === 0 ? (
          <EmptyPost>
            <span>포스트가 없어요 ㅠㅠ</span>
            <span>포스트를 생성해 게임 친구를 모집해 보세요 !</span>
            <span />
          </EmptyPost>
        ) : (
          renderPosts(posts)
        )}
      </Fragment>
    );
  }
}

export default PostsListComponent;
