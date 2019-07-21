import styled from 'styled-components';
import { color, zIndex } from '@src/styles';

export const GlobalLoadingRootDiv = styled('div')`
  position: absolute;
  z-index: ${zIndex.heaven};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: stretch;
  max-height: stretch;
  min-height: stretch;
  background-color: ${color.loadingBackground};

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
    fill: ${color.loadingBackground};
  }
  .cls-2 {
    mask: url(#mask);
  }
  .cls-3 {
    fill: none;
    stroke: ${color.black};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 10.25px;
  }
  .cls-4 {
    filter: url(#luminosity-noclip);
  }
`;
