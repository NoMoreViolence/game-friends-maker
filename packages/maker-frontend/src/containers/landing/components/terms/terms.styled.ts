import styled from 'styled-components';
import { color } from 'styles';

export const TermsRootDiv = styled('div')`
  width: calc(350px - 3rem);
  height: calc(450px - 3rem);
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: ${color.primary};

  > div.title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 2rem;

    > span {
      font-size: 1.5rem;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      color: ${color.white};
    }

    > img {
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
    }
  }

  > div.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    background-color: ${color.white};
    border-radius: 0.75rem;

    > div:nth-child(1) {
      padding-top: 1rem;
    }
    > div {
      margin-bottom: 1rem;

      > span {
        padding-left: 1rem;

        font-size: 1rem;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: normal;
        letter-spacing: normal;
        color: ${color.black};
      }
    }
  }
`;
