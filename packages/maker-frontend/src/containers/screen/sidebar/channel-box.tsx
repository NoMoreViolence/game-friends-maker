import { MyChannels_myChannels } from 'graphqls/queries/__generated__/MyChannels';
import React, { FC } from 'react';
import styled from 'styled-components';
import { color } from 'styles';
import {
  Span16,
  HoverStyleCss,
  hoverStyleCss,
  boxShadowCss,
  BoxShadowCss,
  TransitionCss,
  transitionCss,
  BorderCss,
  borderCss,
  PaddingCss,
  paddingCss,
  backgroundCss,
  BackgroundCss,
  WidthHeightCss,
  widthHeightCss,
  MarginCss,
  marginCss,
} from 'ui';

interface Props {
  selectChannel(): void;
  userChannelJoin: MyChannels_myChannels;
  selected: boolean;
}
export const ChannelBox: FC<Props> = ({ userChannelJoin, selected, selectChannel }) => (
  <StyledChannelBox
    onClick={selectChannel}
    selected={selected}
    width="100%"
    mt={15}
    mb={15}
    borderRadius={4}
    borderWidth={1}
    borderColor={color.transparent}
    padding={8}
    backgroundColor={color.white}
    transition={0.25}
    boxShadow="0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.16)"
    hoverBoxShadow="0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  >
    <Span16 color={selected ? color.white : color.black}>{userChannelJoin.channel.name}</Span16>
  </StyledChannelBox>
);

interface StyledChannelBoxProps
  extends WidthHeightCss,
    MarginCss,
    BorderCss,
    PaddingCss,
    BackgroundCss,
    BoxShadowCss,
    TransitionCss,
    HoverStyleCss {
  selected: boolean;
}
const StyledChannelBox = styled.button<StyledChannelBoxProps>`
  ${widthHeightCss}
  ${marginCss}
  ${borderCss}
  ${paddingCss}
  ${backgroundCss}
  ${boxShadowCss}
  ${transitionCss}
  ${hoverStyleCss}

  ${({ selected }) =>
    selected
      ? `
    background-color: ${color.mainColor};
  `
      : ``};
`;
