import styled from 'styled-components';
import { device, color } from '@styles';

export const HeaderRootDiv = styled('div')`
  box-sizing: border-box;
  height: 70px;
  width: 100%;
  display: flex;
  background-color: ${color.yellow};

  @media screen and ${device.mobileToDesktop} {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  @media screen and ${device.desktopAll} {
    padding-right: 6.25rem;
    padding-left: 6.25rem;
  }
`;

export const HeaderContentDiv = styled('div')`
  flex: 1;

  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > div.logo-picture {
    > img {
      cursor: pointer;
    }
  }

  > div.menu-list {
    height: 100%;
    display: flex;
    align-items: center;

    @media screen and ${device.mobileToTablet} {
      > input {
      }
      > i {
        margin-right: 0.25rem;
        margin-left: 0.25rem;
        cursor: pointer;
      }
      > img {
        margin-left: 0.25rem;
        cursor: pointer;
      }
      > i:nth-child(1) {
        margin-left: unset;
      }
      > i:nth-last-child(1) {
        margin-right: unset;
      }
    }
    @media screen and ${device.tabletToDesktop} {
      > input {
        width: 300px;
      }
      > i {
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        cursor: pointer;
      }
      > img {
        margin-left: 0.5rem;
        cursor: pointer;
      }
      > i:nth-child(1) {
        margin-left: unset;
      }
      > i:nth-last-child(1) {
        margin-right: unset;
      }
    }
    @media screen and ${device.desktopAll} {
      > input {
        width: 500px;
      }
      > img {
        margin-left: 1.75rem;
        cursor: pointer;
      }
      > i {
        cursor: pointer;
        margin-right: 1.75rem;
        margin-left: 1.75rem;
      }
      > i:nth-child(1) {
        margin-left: unset;
      }
      > i:nth-last-child(1) {
        margin-right: unset;
      }
    }
  }
`;
