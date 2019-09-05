import styled from 'styled-components';
import { device } from '@styles';

export const Landing01RootDiv = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 2rem;

  @media screen and ${device.mobileToLaptop} {
    flex-direction: column;
  }

  background-color: #ffdc00;
`;

export const Landing01TextDiv = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > div:nth-child(1) {
    display: flex;
    flex-direction: column;

    margin-bottom: 0.75rem;
  }

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;

    margin-top: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;

export const Landing01ImageDiv = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 100%;

    @media screen and ${device.mobileToLaptop} {
      max-width: 400px;
    }
  }
`;
