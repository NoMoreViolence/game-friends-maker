import React, { FC } from 'react';
import styled from 'styled-components';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  boxShadow,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  margin,
  MarginProps,
  padding,
  PaddingProps,
  ShadowProps,
} from 'styled-system';
import { Colors } from 'ui';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}
export const TeamBox: FC<Props> = (props) => (
  <TeamBoxDiv
    width={50}
    height={50}
    mr="auto"
    ml="auto"
    mt={16}
    mb={16}
    justifyContent="center"
    alignItems="center"
    borderColor={Colors.black}
    borderRadius={4}
    borderWidth={1}
    borderStyle="solid"
    background={props.selected ? Colors.secondary : Colors.white}
    {...props}
  />
);

interface TeamBoxProps
  extends FlexboxProps,
    LayoutProps,
    BorderProps,
    MarginProps,
    PaddingProps,
    ShadowProps,
    BackgroundProps {}
const TeamBoxDiv = styled.div<TeamBoxProps>`
  ${flexbox}
  ${layout}
  ${border}
  ${margin}
  ${padding}
  ${boxShadow}
  ${background}
  transition: .25s;
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.16);
  }
`;
