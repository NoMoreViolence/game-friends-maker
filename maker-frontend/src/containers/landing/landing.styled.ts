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

  span {
    font-size: 1rem;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: ${color.white};
  }

  > div:nth-child(2) {
    > span:nth-child(1).activate,
    > span:nth-last-child(1).activate {
      color: ${color.white};
    }

    > span:nth-child(1),
    > span:nth-last-child(1) {
      color: ${color.whiteSoft};
      cursor: pointer;
    }
  }
`;

export const LandingComponentLoginContentDiv = styled('div')<{ backgroundColor?: string }>`
  height: calc(90vh - 6rem);
  display: flex;
  justify-content: space-between;
  padding: 3rem;

  @media screen and ${device.mobile} {
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
      font-size: 2rem;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      font-weight: bold;
      color: ${color.white};
    }

    > span.sub-message {
      font-size: 1rem;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      font-weight: bold;
      color: ${color.whiteSoft};
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

      > span {
        cursor: pointer;
        font-size: 0.75rem;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        font-weight: 300;
        color: ${color.whiteSoft};
        transition: 0.25s;

        &:hover {
          color: ${color.white};
        }
      }
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

        > span {
          font-size: 1rem;
          font-style: normal;
          font-stretch: normal;
          line-height: normal;
          letter-spacing: normal;
          font-weight: 300;
          color: ${color.black};
        }
      }
    }
  }
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : color.black)};
`;

export const LandingComponentContentDiv = styled('div')<{ backgroundColor?: string }>`
  display: flex;
  justify-content: space-between;
  padding: 3rem;

  > div {
    > img.landing {
      border-radius: 0.75rem;
      height: 600px;
    }
  }
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : color.black)};
`;
