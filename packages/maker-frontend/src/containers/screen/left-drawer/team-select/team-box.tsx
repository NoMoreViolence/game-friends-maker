import React, { FC } from 'react';
import styled from 'styled-components';
import {
  FlexboxCss,
  PointerCss,
  BorderCss,
  WidthHeightCss,
  MarginCss,
  PaddingCss,
  TransitionCss,
  HoverStyleCss,
  BoxShadowCss,
  flexboxCss,
  pointerCss,
  borderCss,
  widthHeightCss,
  marginCss,
  paddingCss,
  transitionCss,
  hoverStyleCss,
  boxShadowCss,
  BackgroundCss,
  backgroundCss,
  Colors,
} from 'ui';
import { color } from 'styles';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}
export const TeamBox: FC<Props> = props => (
  <TeamBoxDiv
    pointer
    width={50}
    height={50}
    mr="auto"
    ml="auto"
    mt={16}
    mb={16}
    isFlex
    justifyContent="center"
    alignItems="center"
    borderColor={color.transparent}
    borderRadius={4}
    borderWidth={1}
    borderStyle="solid"
    transition={0.25}
    boxShadow="0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.16)"
    hoverBoxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    backgroundColor={Colors.primary}
    {...props}
  />
);

interface TeamBoxProps
  extends FlexboxCss,
    PointerCss,
    BorderCss,
    WidthHeightCss,
    MarginCss,
    PaddingCss,
    TransitionCss,
    HoverStyleCss,
    BoxShadowCss,
    BackgroundCss {
  selected?: boolean;
}
const TeamBoxDiv = styled.div<TeamBoxProps>`
  ${flexboxCss}
  ${pointerCss}
  ${borderCss}
  ${widthHeightCss}
  ${marginCss}
  ${paddingCss}
  ${transitionCss}
  ${hoverStyleCss}
  ${boxShadowCss}
  ${backgroundCss}
  ${({ selected }) =>
    selected
      ? `
    background-color: ${Colors.secondary};
  `
      : ''}
`;
