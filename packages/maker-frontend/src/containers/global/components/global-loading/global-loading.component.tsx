import React, { memo } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import { AppState } from '@bootstrap';
import { isUserPending } from '@reducers';
import LoadingLogoSvg from '@svgs/loading-logo';
import { GlobalLoadingRootDiv } from './global-loading.styled';

const getAllPendings = ({ user }: AppState): boolean[] => [isUserPending(user)];
const isPending = createSelector(
  [getAllPendings],
  (allPendings: boolean[]) => allPendings.filter(flag => flag).length !== 0,
);

const _GlobalLoadingComponent = () => {
  const loadingFlag = useSelector((state: AppState) => isPending(state), shallowEqual);

  return (
    <>
      {loadingFlag && (
        <GlobalLoadingRootDiv>
          <LoadingLogoSvg />
        </GlobalLoadingRootDiv>
      )}
    </>
  );
};
const GlobalLoadingComponent = memo(_GlobalLoadingComponent);

export default GlobalLoadingComponent;
