import React, { FC } from 'react';
import styled from 'styled-components';
import { color } from 'styles';
import {
  BackgroundCss,
  backgroundCss,
  BorderCss,
  borderCss,
  BoxShadowCss,
  boxShadowCss,
  Colors,
  FlexboxCss,
  flexboxCss,
  HoverStyleCss,
  hoverStyleCss,
  MarginCss,
  marginCss,
  PaddingCss,
  paddingCss,
  PointerCss,
  pointerCss,
  TransitionCss,
  transitionCss,
  WidthHeightCss,
  widthHeightCss,
} from 'ui';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}
export const TeamBox: FC<Props> = (props) => (
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
    borderColor={color.black}
    borderRadius={4}
    borderWidth={1}
    borderStyle="solid"
    transition={0.25}
    hoverBoxShadow="0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.16)"
    backgroundColor={Colors.white}
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
