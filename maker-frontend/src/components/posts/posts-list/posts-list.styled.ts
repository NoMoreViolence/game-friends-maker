import styled from 'styled-components';

export const EmptyPost = styled('div')`
  width: 100%;
  background-color: white;
  margin-bottom: 2rem;
  border-radius: 0.75rem;
  border: 0px solid transparent;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > span:nth-child(1) {
    margin-bottom: 1rem;
  }
  > span {
    font-size: 1.5rem;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.1px;
    color: #333333;
  }

  > div.title {
  }

  > div.content {
  }

  > div.join {
  }
`;
