import styled from 'styled-components';
import { device, color, shadow } from '@styles';

export const MailChimpFormRootDiv = styled('div')`
  @media screen and ${device.mobileToTablet} {
    width: calc(300px - 2rem);
    height: calc(250px- 2rem);
  }
  width: calc(500px - 2rem);
  height: calc(250px - 2rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-radius: 0.25rem;
  border: 0px solid transparent;
  padding: 1rem;

  box-shadow: ${shadow.hover};
  background-color: ${color.white};

  > div.title {
    display: flex;
    flex-direction: column;
    align-items: center;

    > span:nth-child(1) {
      margin-bottom: 1rem;
    }
  }

  > div.email-form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:nth-child(1) {
      margin-right: 2rem;
    }
  }
`;
