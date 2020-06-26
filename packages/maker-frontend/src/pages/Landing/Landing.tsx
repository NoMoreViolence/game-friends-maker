import React, { FC } from 'react';
import styled from 'styled-components';

export const Landing: FC = () => {
  return <Container></Container>;
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  overflow: auto;
`;
