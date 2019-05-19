import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import HeaderPage from '@pages/header/header.page';
import './posts.page.scss';

const PostsPage: React.FC<RouteComponentProps> = ({ history, match, location }) => (
  <div id="posts-container">
    <HeaderPage />
    <div className="posts-content">
      <div className="posts-list">나는 포스트다</div>
      <div className="posts-config">나는 설정이다</div>
    </div>
  </div>
);

export default PostsPage;
