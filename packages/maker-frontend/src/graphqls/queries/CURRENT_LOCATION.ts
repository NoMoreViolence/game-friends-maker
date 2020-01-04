import gql from 'graphql-tag';
import { CurrentLocationFragment } from 'graphqls/fragments/current-location-fragment';

export const CURRENT_LOCATION = gql`
  ${CurrentLocationFragment}
  query CurrentLocation {
    currentLocation @client {
      ...CurrentLocationFull
    }
  }
`;
