import gql from 'graphql-tag';
import { CurrentLocationFragment } from 'graphqls/fragments/current-location-fragment';

export const UPDATE_CURRENT_LOCATION = gql`
  ${CurrentLocationFragment}
  mutation UpdateCurrentLocation($nextCurrentLocation: NextCurrentLocation!) {
    updateCurrentLocation(nextCurrentLocation: $nextCurrentLocation) @client {
      ...CurrentLocationFull
    }
  }
`;
