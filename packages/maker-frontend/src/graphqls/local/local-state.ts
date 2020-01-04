import gql from 'graphql-tag';
import { merge } from 'lodash';
import { DeepPartial } from 'utility-types';

import { CURRENT_LOCATION } from 'graphqls/queries/CURRENT_LOCATION';
import { UpdateCurrentLocationVariables } from 'graphqls/mutations/__generated__/UpdateCurrentLocation';
import { CurrentLocation } from 'graphqls/queries/__generated__/CurrentLocation';
import { LocalStateModule } from './state-module';

export const localStateModule: LocalStateModule<CurrentLocation> = {
  initialState: {
    currentLocation: {
      __typename: 'CurrentLocation',
      currentTeamUserJoinId: null,
    },
  },
  typeDefs: gql`
    extend type Query {
      currentLocation: CurrentLocation!
    }
    extend type Mutation {
      updateCurrentLocation(nextCurrentLocation: NextCurrentLocation): CurrentLocation
    }
    type CurrentLocation {
      currentTeamUserJoinId: ID
    }
    input NextCurrentLocation {
      currentTeamUserJoinId: ID
    }
  `,
  resolvers: {
    Mutation: {
      updateCurrentLocation: (_, { nextCurrentLocation }: UpdateCurrentLocationVariables, { cache }) => {
        const prev: CurrentLocation = cache.readQuery({ query: CURRENT_LOCATION });
        const nextPartial: DeepPartial<CurrentLocation> = {
          currentLocation: nextCurrentLocation,
        };
        const next = merge({}, prev, nextPartial);
        cache.writeQuery({ query: CURRENT_LOCATION, data: next });
      },
    },
  },
};
