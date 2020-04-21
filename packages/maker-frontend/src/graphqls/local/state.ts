import gql from 'graphql-tag';
import { UpdateCurrentTeamUserJoinIdVariables } from 'graphqls/mutations/__generated__/UpdateCurrentTeamUserJoinId';
import { UpdateCurrentUserChannelJoinIdVariables } from 'graphqls/mutations/__generated__/UpdateCurrentUserChannelJoinId';
import { CURRENT_TEAM_USER_JOIN_ID } from 'graphqls/queries/CURRENT_TEAM_USER_JOIN_ID';
import { CURRENT_USER_CHANNEL_JOIN_ID } from 'graphqls/queries/CURRENT_USER_CHANNEL_JOIN_ID';
import { CurrentTeamUserJoinId } from 'graphqls/queries/__generated__/CurrentTeamUserJoinId';
import { CurrentUserChannelJoinId } from 'graphqls/queries/__generated__/CurrentUserChannelJoinId';
import { merge } from 'lodash';
import { DeepPartial } from 'utility-types';
import { LocalStateModule } from './module';

export const currentTeamUserModule: LocalStateModule<CurrentTeamUserJoinId> = {
  initialState: {
    currentTeamUserJoinId: {
      __typename: 'CurrentTeamUserJoinId',
      currentTeamUserJoinId: null,
    },
  },
  typeDefs: gql`
    extend type Query {
      currentTeamUserJoinId: CurrentTeamUserJoinId!
    }
    extend type Mutation {
      updateCurrentTeamUserJoinId(nextCurrentTeamUserJoinId: NextCurrentTeamUserJoinId): CurrentTeamUserJoinId
    }
    type CurrentTeamUserJoinId {
      currentTeamUserJoinId: ID
    }
    input NextCurrentTeamUserJoinId {
      currentTeamUserJoinId: ID
    }
  `,
  resolvers: {
    Mutation: {
      updateCurrentTeamUserJoinId: (
        _,
        { nextCurrentTeamUserJoinId }: UpdateCurrentTeamUserJoinIdVariables,
        { cache }
      ) => {
        const prev: CurrentTeamUserJoinId = cache.readQuery({ query: CURRENT_TEAM_USER_JOIN_ID });
        const nextPartial: DeepPartial<CurrentTeamUserJoinId> = {
          currentTeamUserJoinId: nextCurrentTeamUserJoinId,
        };
        const next = merge({}, prev, nextPartial);
        cache.writeQuery({ query: CURRENT_TEAM_USER_JOIN_ID, data: next });
      },
    },
  },
};

export const currentUserChannelModule: LocalStateModule<CurrentUserChannelJoinId> = {
  initialState: {
    currentUserChannelJoinId: {
      __typename: 'CurrentUserChannelJoinId',
      currentUserChannelJoinId: null,
    },
  },
  typeDefs: gql`
    extend type Query {
      currentUserChannelJoinId: CurrentUserChannelJoinId!
    }
    extend type Mutation {
      updateCurrentUserChannelJoinId(
        nextCurrentUserChannelJoinId: NextCurrentUserChannelJoinId
      ): CurrentUserChannelJoinId
    }
    type CurrentUserChannelJoinId {
      currentUserChannelJoinId: ID
    }
    input NextCurrentUserChannelJoinId {
      currentUserChannelJoinId: ID
    }
  `,
  resolvers: {
    Mutation: {
      updateCurrentUserChannelJoinId: (
        _,
        { nextCurrentUserChannelJoinId }: UpdateCurrentUserChannelJoinIdVariables,
        { cache }
      ) => {
        const prev: CurrentUserChannelJoinId = cache.readQuery({ query: CURRENT_USER_CHANNEL_JOIN_ID });
        const nextPartial: DeepPartial<CurrentUserChannelJoinId> = {
          currentUserChannelJoinId: nextCurrentUserChannelJoinId,
        };
        const next = merge({}, prev, nextPartial);
        cache.writeQuery({ query: CURRENT_USER_CHANNEL_JOIN_ID, data: next });
      },
    },
  },
};
