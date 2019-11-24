import gql from 'graphql-tag';

export const UPDATE_POST = gql`
  mutation UpdatePost($postId: String!, $nextPost: UpdatePostPayload!) {
    updatePost(postId: $postId, nextPost: $nextPost) {
      name
      authorId {
        name
        _id
      }
    }
  }
`;
