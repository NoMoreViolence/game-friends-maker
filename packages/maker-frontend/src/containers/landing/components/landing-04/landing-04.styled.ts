import styled from 'styled-components';
import { device, zIndex } from '@styles';

export const Landing04RootDiv = styled('div')`
  flex: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  position: relative;

  @media screen and ${device.mobileToLaptopL} {
    padding: 1rem;
  }
  @media screen and ${device.mobileToLaptop} {
    flex-direction: column;
  }

  > img {
    z-index: ${zIndex.level1};
    position: absolute;
    max-width: 500px;
    bottom: 0;
    right: -100px;

    @media screen and ${device.mobileToLaptop} {
      max-width: 200px;
      bottom: 0;
      right: 50px;
    }
  }
`;

export const Landing04FormDiv = styled('div')`
  z-index: ${zIndex.level2};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 150px;
  margin-bottom: 150px;

  > div.title {
    margin-bottom: 1.5rem;
  }

  > div.sub {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
  }

  > div.input-and-button {
    display: flex;
    > input {
      margin-right: 2rem;
    }
  }
`;
