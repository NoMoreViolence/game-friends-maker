import styled from 'styled-components';
import { zIndex, color, device, shadow } from '@src/styles';

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

  > div:nth-child(1) {
    height: 100%;
    flex: calc(60% - 1.5rem);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1.5rem;
    background-color: ${color.primary};
  }

  > div:nth-child(2) {
    height: 100%;
    flex: calc(40% - 1.5rem);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1.5rem;
    background-color: ${color.white};
    @media screen and ${device.mobileToDesktop} {
      background-color: ${color.primary};
    }
  }
`;

export const LandingComponentLoginContentDiv = styled('div')`
  display: flex;
  justify-content: space-between;

  > div:nth-child(1) {
    flex: 0.6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${color.primary};

    > div {
      display: flex;
      flex-direction: column;

      > span.main-message {
        margin-bottom: 1rem;
      }

      > span.sub-message {
      }
    }
  }
  > div:nth-child(2) {
    flex: 0.4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${color.white};

    > div.terms {
      margin-bottom: 1rem;
    }

    > div.google-button {
      > button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.75rem;
        border: 1px solid ${color.transparent};
        padding: 1rem;
        box-shadow: ${shadow.default};
        font-family: inherit;
        transition: 0.25s;

        cursor: pointer;
        background-color: ${color.white};

        &:hover {
          box-shadow: ${shadow.hover};
        }

        > svg {
          margin-right: 1rem;
        }
      }
    }
  }

  @media screen and ${device.mobile} {
    flex-direction: column;

    > div:nth-child(1) {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
    > div:nth-child(2) {
      background-color: ${color.primary};
      padding-top: 3rem;
      padding-bottom: 5rem;
    }
  }

  @media screen and ${device.tablet} {
    flex-direction: column;

    > div:nth-child(1) {
      padding-top: 10rem;
      padding-bottom: 10rem;
    }
    > div:nth-child(2) {
      background-color: ${color.primary};
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
  }

  @media screen and ${device.desktop} {
    > div:nth-child(1) {
      padding-top: 20rem;
      padding-bottom: 20rem;
    }

    > div:nth-child(2) {
      padding-top: 20rem;
      padding-bottom: 20rem;
    }
  }
`;

export const LandingComponentContentDiv = styled('div')<{ backgroundColor?: string; reverse?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > img {
      border: 0px solid transparent;
      border-radius: 0.75rem;
    }

    > span:nth-child(1) {
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  @media screen and ${device.mobile} {
    flex-direction: column;
    padding: 2rem;

    > div {
      margin-bottom: 1rem;

      > img {
        width: calc(375px - 4rem);
      }
    }
  }

  @media screen and ${device.tablet} {
    flex-direction: ${p => (p.reverse ? 'row-reverse' : 'row')};
    padding: 3rem;

    > div {
      flex: 1;
      > img {
        width: calc(400px - 6rem);
      }
    }
  }

  @media screen and ${device.desktop} {
    flex-direction: ${p => (p.reverse ? 'row-reverse' : 'row')};
    padding: 5rem;

    > div {
      flex: 1;
      > img {
        width: calc(650px - 10rem);
      }
    }
  }

  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : color.black)};
`;

export const LandingComponentBottom = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: ${color.white};

  > div {
    display: flex;
    align-items: center;

    > img {
      width: 150px;
    }
  }
`;
