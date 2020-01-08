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
} from 'ui';
import { color } from 'styles';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}
export const TeamBox: FC<Props> = ({ children, ...props }) => (
  <TeamBoxDiv
    pointer
    width={50}
    height={50}
    mr="auto"
    ml="auto"
    mt={15}
    mb={15}
    isFlex
    justifyContent="center"
    alignItems="center"
    borderColor={color['border-gray']}
    borderRadius={4}
    borderWidth={1}
    borderStyle="solid"
    transition={0.25}
    boxShadow="0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.16)"
    hoverBoxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
    {...props}
  >
    {children}
  </TeamBoxDiv>
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
    BoxShadowCss {
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
  ${({ selected }) =>
    selected
      ? `
    background-color: ${color.skyBlue};
  `
      : ''}
`;
