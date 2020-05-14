import { LoadingPortal } from 'portals';
import React, { FC } from 'react';
import styled from 'styled-components';
import LoadingLogoSvg from 'svgs/loading-logo';
import { Colors, zIndex } from 'ui/styles';

interface Props {
  /**
   * @default true
   */
  isLoading?: boolean; // true
}

export const Loading: FC<Props> = ({ isLoading = true }) =>
  isLoading ? (
    <LoadingPortal>
      <GlobalLoadingRootDiv>
        <LoadingLogoSvg />
      </GlobalLoadingRootDiv>
    </LoadingPortal>
  ) : null;

export const GlobalLoadingRootDiv = styled('div')`
  z-index: ${zIndex.loading};
  background-color: ${Colors['modal-dim']};

  position: fixed;
  width: 100vw;
  height: 100vh;
  max-height: stretch;
  min-height: stretch;
  max-width: stretch;
  min-width: stretch;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  .svg-logo {
    width: 150px;
    height: 150px;
  }

  .stroke {
    stroke-dasharray: 200 814;
    stroke-dashoffset: 655;
    animation: dash 2s ease-in-out infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 1664;
    }
  }

  .cls-1 {
    fill: ${Colors.gray};
  }
  .cls-2 {
    mask: url(#mask);
  }
  .cls-3 {
    fill: none;
    stroke: ${Colors.black};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 10.25px;
  }
  .cls-4 {
    filter: url(#luminosity-noclip);
  }
`;
