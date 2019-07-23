import styled from 'styled-components';
import { zIndex, color, device } from '@src/styles';

export const LandingComponentRootDiv = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: ${color.primary};
`;

export const LandingComponentHeaderDiv = styled('div')`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  background-color: ${color.primary};

  > div:nth-child(2) {
    > span:nth-child(1).activate,
    > span:nth-last-child(1).activate {
      color: ${color.white};
    }
  }
`;

export const LandingComponentLoginContentDiv = styled('div')<{ backgroundColor?: string }>`
  position: relative;
  height: calc(90vh - 6rem);
  display: flex;
  justify-content: space-between;
  padding: 3rem;

  @media screen and ${device.mobileToDesktop} {
    flex-direction: column;
  }

  > div:nth-child(1) {
    flex: 0.6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > span.main-message {
      margin-bottom: 1rem;
    }

    > span.sub-message {
    }
  }

  > div:nth-child(2) {
    flex: 0.4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div.terms {
      margin-bottom: 1rem;
    }

    > div.google-button {
      > button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.25rem;
        border-color: transparent;
        padding: 1rem;
        transition: 0.25s;

        cursor: pointer;
        background-color: ${color.white};

        &:hover {
          background-color: ${color.primary};
          > span {
            color: ${color.white};
          }
        }

        > svg {
          margin-right: 1rem;
        }
      }
    }
  }
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : color.black)};

  &::before,
  &::after {
    border-bottom: 5px solid black;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    background-size: 80px 160px;
    background-image: radial-gradient(circle at 40px -60px, transparent 80px, black 84px);
  }
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    background-size: 160px 160px;
    background-image: radial-gradient(circle at 40px 104px, black 80px, transparent 84px);
  }
`;

export const LandingComponentContentDiv = styled('div')<{ backgroundColor?: string }>`
  height: calc(90vh - 6rem);
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  padding: 3rem;

  @media screen and ${device.mobileToDesktop} {
    flex-direction: column-reverse;

    > div:nth-child(1) {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      > img.landing {
        border-radius: 0.75rem;
        height: calc(60vh - 3rem);
      }
    }

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: center;

      > span:nth-child(1) {
        margin-bottom: 1rem;
      }
    }
  }

  > div:nth-child(1) {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    > img.landing {
      border-radius: 0.75rem;
      height: calc(60vh - 3rem);
    }
  }
  > div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > span:nth-child(1) {
      margin-bottom: 1rem;
    }
  }

  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : color.black)};
`;
