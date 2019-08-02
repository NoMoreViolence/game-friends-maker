import styled from 'styled-components';
import { zIndex, color, device, shadow } from '@src/styles';

export const LandingComponentRootDiv = styled('div')`
  display: flex;
  flex-direction: column;
  background-color: ${color.white};
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
    background-color: ${color.white};
  }

  > div:nth-child(2) {
    height: 100%;
    flex: calc(40% - 1.5rem);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1.5rem;
    background-color: ${color.white};
  }
`;

export const LandingComponentLoginContentDiv = styled('div')<{ backgroundUrl: string }>`
  display: flex;
  justify-content: space-between;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
    
  background-image: linear-gradient(
          rgba(0, 0, 0, 0.7), 
          rgba(0, 0, 0, 0.7)
        ), url('${p => p.backgroundUrl}');
      


  > div:nth-child(1) {
    flex: 0.6;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

    > div.google-button {
      margin-bottom: 1rem;
      > button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 0.1875rem;
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

    > div.terms {
    }
  }

  @media screen and ${device.mobile} {
    flex-direction: column;

    > div:nth-child(1) {
      padding-top: 5rem;
      padding-bottom: 5rem;
    }
    > div:nth-child(2) {
      padding-top: 2.5rem;
      padding-bottom: 1.25rem;
    }
  }

  @media screen and ${device.tablet} {
    flex-direction: column;

    > div:nth-child(1) {
      padding-top: 10rem;
      padding-bottom: 10rem;
    }
    > div:nth-child(2) {
      padding-top: 5rem;
      padding-bottom: 2.5rem;
    }
  }

  @media screen and ${device.desktop} {
    flex-direction: column;

    > div:nth-child(1) {
      padding-top: 10rem;
      padding-bottom: 10rem;
    }

    > div:nth-child(2) {
      padding-top: 5rem;
      padding-bottom: 7.5rem;
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
    }

    > span:nth-child(1) {
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  @media screen and ${device.mobile} {
    flex-direction: column;

    > div:nth-child(1) {
      margin-top: 4.125rem;
      margin-bottom: 5rem;
    }

    > div {
      > img {
        width: 100%;
      }
    }
  }

  @media screen and ${device.tablet} {
    flex-direction: column;

    > div:nth-child(1) {
      margin-top: 7.5rem;
      margin-bottom: 5rem;
    }

    > div {
      flex: 1;
      > img {
        width: 100%;
      }
    }
  }

  @media screen and ${device.desktop} {
    flex-direction: ${p => (p.reverse ? 'row-reverse' : 'row')};

    > div {
      flex: 1;
      > img {
        width: 100%;
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
