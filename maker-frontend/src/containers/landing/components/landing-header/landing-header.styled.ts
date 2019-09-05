import styled from 'styled-components';
import { color, shadow, zIndex } from '@styles';

export const LandingHeaderRootDiv = styled('div')`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-right: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: ${color.white};
  box-shadow: ${shadow.default};
  z-index: ${zIndex.level1};

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
