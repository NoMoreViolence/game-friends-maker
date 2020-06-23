import React, { FC } from 'react';
import styled from 'styled-components';
import { background, BackgroundProps, margin, MarginProps } from 'styled-system';
import { Colors } from 'ui/Colors';
import { SvgIconProps } from './Interface';
import { svgMap } from './SvgMap';

export type IconName = keyof typeof svgMap;

interface Props extends MarginProps, SvgIconProps, BackgroundProps {
  iconName: IconName;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const Container = styled.div<MarginProps & BackgroundProps>`
  ${margin}
  ${background}
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Icon: FC<Props> = ({
  iconName,
  size = 24,
  fillColor = Colors.black,
  opacity,
  mr,
  ml,
  mt,
  mb,
  style,
  background,
}) => {
  const SvgIcon = svgMap[iconName];

  return (
    <Container mr={mr} ml={ml} mt={mt} mb={mb} style={style} background={background}>
      <SvgIcon size={size} fillColor={fillColor} opacity={opacity} />
    </Container>
  );
};
