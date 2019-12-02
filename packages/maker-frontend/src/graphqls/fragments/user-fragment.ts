import gql from 'graphql-tag';
import { TeamFullFragment } from './team-fragment';

export const UserFullFragment = gql`
  ${TeamFullFragment}
  fragment UserFull on User {
    _id
    name
    email
    teams {
      ...TeamFull
    }
    pendingTeams {
      ...TeamFull
    }
    relatedTeams {
      ...TeamFull
    }
    createdAt
    updatedAt
    deleted
  }
`;
