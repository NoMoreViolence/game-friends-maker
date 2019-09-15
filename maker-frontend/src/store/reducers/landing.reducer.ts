import { produce } from 'immer';
import { createSelector } from 'reselect';
import { Status, Landing } from '@models';
import { LandingActions } from '@actions';

export const landingInitialState: Landing = {
  landingLoaderStatus: {
    emailStatus: 'initial',
  },
  landingStatus: {},
};

export const landingReducer = (state: Landing = landingInitialState, action: LandingActions): Landing =>
  produce(state, (draft: Landing) => {
    switch (action.type) {
      case 'EMAIL_SUBSCRIBE':
        draft.landingLoaderStatus.emailStatus = 'pending';
        break;
      case 'EMAIL_SUBSCRIBE_SUCCESS':
        draft.landingLoaderStatus.emailStatus = 'success';
        break;
      case 'EMAIL_SUBSCRIBE_FAILURE':
        draft.landingLoaderStatus.emailStatus = 'failure';
        break;

      default:
        break;
    }
  });

export const getLandingStatusSelector = (state: Landing) => ({
  ...state.landingLoaderStatus,
});

export const isLandingPending = createSelector(
  [getLandingStatusSelector],
  (pendings: { [key: string]: Status }) => Object.values(pendings).filter(state => state === 'pending').length !== 0,
);
