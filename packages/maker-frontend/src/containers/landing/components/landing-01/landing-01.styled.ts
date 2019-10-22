import styled from 'styled-components';
import { device, color, shadow } from '@styles';

export const Landing01RootDiv = styled('div')`
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;

  @media screen and ${device.mobileToLaptopL} {
    padding: 2rem;
  }
  @media screen and ${device.mobileToLaptop} {
    flex-direction: column;
  }
`;

export const Landing01TextDiv = styled('div')`
  flex-basis: calc(100% - 2.5rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding-right: 2.5rem;

  @media screen and ${device.mobileToLaptop} {
    padding-right: unset;
    flex-basis: 100%;
  }

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;

    margin-bottom: 0.75rem;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;

    margin-top: 0.75rem;
    margin-bottom: 4rem;
  }
`;

export const Landing01ImageDiv = styled('div')`
  box-sizing: border-box;
  flex-basis: calc(100% - 2.5rem);
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: 2.5rem;
  padding-right: unset;
  @media screen and ${device.mobileToLaptop} {
    flex-basis: calc(100% - 3rem);
    padding: 1.5rem;
  }

  > div {
    > img {
      width: 100%;
      max-width: 500px;

      @media screen and ${device.mobileToLaptop} {
        max-width: 350px;
      }
    }
  }
`;

export const GoogleLoginButton = styled.button`
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
`;
