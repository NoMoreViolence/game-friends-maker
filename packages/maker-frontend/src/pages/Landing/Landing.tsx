import React, { FC } from 'react';
import styled from 'styled-components';
import { LoginForm } from './LoginForm';
import { Row } from 'ui/Layout';

export const Landing: FC = () => {
  return (
    <Container>
      <Row margin="16px">
        <LoginForm />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  overflow: auto;
`;
