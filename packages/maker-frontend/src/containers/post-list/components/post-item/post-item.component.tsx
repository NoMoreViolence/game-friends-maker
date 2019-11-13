import React, { FC } from 'react';

import { PostItem } from 'store/models/database';
import { PostItemRootDiv } from './post-item.styled';

interface Props {
  post: PostItem;
}

const PostItemComponent: FC<Props> = props => {
  return <PostItemRootDiv>FUCK</PostItemRootDiv>;
};

export default PostItemComponent;
