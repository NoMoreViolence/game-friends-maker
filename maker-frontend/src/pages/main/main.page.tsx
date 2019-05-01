import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

const MainDiv = styled.div`
  position: relative;
  display: flex;
  background-color: #64b5f6;
`;

const MainPage: FC = () => (
  <MainDiv>
    <img src="/images/illustrators/background-1-color.svg" alt="" />
    <Button type="primary">Fucking</Button>
  </MainDiv>
);

export default MainPage;
