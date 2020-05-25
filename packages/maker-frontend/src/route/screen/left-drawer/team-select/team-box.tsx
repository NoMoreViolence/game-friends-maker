import React, { FC } from 'react';
import styled from 'styled-components';
import { boxShadow, BoxShadowProps } from 'styled-system';
import { Colors, textStyles } from 'ui';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}
export const TeamBox: FC<Props> = (props) => (
  <Box boxShadow={props.selected ? '0 0 0 0.2rem rgba(0, 0, 0, 0.5)' : undefined} {...props} />
);

interface TeamBoxProps extends BoxShadowProps {}
const Box = styled.div<TeamBoxProps>`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 16px auto;
  border: 1px solid ${Colors.likeBlack};
  border-radius: 2px;

  color: ${Colors.likeBlack};
  background-color: ${Colors.likeWhite};

  transition: 0.25s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 0.1rem rgba(0, 0, 0, 0.5);
  }

  ${boxShadow}
  ${textStyles.px24}
`;
