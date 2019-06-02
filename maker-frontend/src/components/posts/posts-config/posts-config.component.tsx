import React, { Component } from 'react';
import { Checkbox } from 'antd';
import { PostsConfigElement } from './posts-config.styled';

class PostsConfig extends Component {
  componentDidMount() {}

  render() {
    const renderGeners = () => {
      //
    };

    return (
      <PostsConfigElement>
        <div className="games">
          <Checkbox>F</Checkbox>
        </div>
      </PostsConfigElement>
    );
  }
}

export default PostsConfig;
