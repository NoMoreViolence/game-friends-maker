import styled from 'styled-components';
import { color, zIndex, device } from '@styles';

export const LandingHeaderRootDiv = styled('div')`
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 30px;
  padding-bottom: 30px;

  background-color: ${color.white};
  z-index: ${zIndex.level1};

  @media screen and ${device.mobileToLaptopL} {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  > a.logo {
    display: flex;
    align-items: center;

    > img {
      margin-right: 0.5rem;
    }

    text-decoration: unset;
    cursor: pointer;
  }

  > div.lang {
  }
`;
