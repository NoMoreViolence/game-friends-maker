import { createSelector } from 'reselect';
import { ImmerReducer, createActionCreators, createReducerFunction, Actions } from 'immer-reducer';
import { Status, Landing } from '@models';

export const landingInitialState: Landing = {
  landingLoaderStatus: {
    emailStatus: 'initial',
  },
  landingStatus: {},
};

export class LandingReducer extends ImmerReducer<Landing> {
  emailSubscribe() {
    this.draftState.landingLoaderStatus.emailStatus = 'pending';
  }
  emailSubscribeSuccess() {
    this.draftState.landingLoaderStatus.emailStatus = 'success';
  }
  emailSubscribeFailure() {
    this.draftState.landingLoaderStatus.emailStatus = 'failure';
  }
}
export type LandingActions = Actions<typeof LandingReducer>;
export const landingActions = createActionCreators(LandingReducer);
export const landingReducerFunction = createReducerFunction(LandingReducer, landingInitialState);

export const getLandingStatusSelector = (state: Landing) => ({
  ...state.landingLoaderStatus,
});

export const isLandingPending = createSelector(
  [getLandingStatusSelector],
  (pendings: { [key: string]: Status }) => Object.values(pendings).filter(state => state === 'pending').length !== 0,
);
