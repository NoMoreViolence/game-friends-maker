import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './posts.page.scss';
import HeaderPage from '@pages/header/header.page';
import PostsListContainer from '@containers/posts/posts-list';
import PostsConfigContainer from '@containers/posts/posts-config';

const PostsPage = ({ history, match, location }: RouteComponentProps) => (
  <div id="posts-container">
    <HeaderPage />
    <div className="posts-content">
      <div className="posts-list">
        <PostsListContainer />
      </div>
      <div className="posts-config">
        <PostsConfigContainer />
      </div>
    </div>
  </div>
);

export default PostsPage;
