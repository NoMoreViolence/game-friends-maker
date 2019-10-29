import styled from 'styled-components';
import { color } from '@styles';

export const LandingComponentRootDiv = styled('div')`
  width: 100%;
  overflow-x: hidden;

  > div.landing-01 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.landing-header-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.white};
    }

    > div.landing-01-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.yellow};
    }
  }

  > div.landing-02 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.landing-02-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.white};
    }
  }

  > div.landing-03 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.landing-03-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.white};
    }
  }

  > div.landing-04 {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.landing-04-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.skyBlue};
    }
  }

  > div.footer {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div.footer-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${color.white};
    }
  }
`;