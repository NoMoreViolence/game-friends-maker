import React, { FC, memo, useMemo } from 'react';
import styled from 'styled-components';
import { background, BackgroundProps, margin, MarginProps } from 'styled-system';
import { Colors } from 'ui/Colors';
import { cursor, CursorProps, transform, TransformProps } from 'ui/System';
import { SvgIconProps } from './Interface';
import { svgMap } from './SvgMap';

interface Props extends SvgIconProps, MarginProps, BackgroundProps, CursorProps, TransformProps {
  iconName: IconName;
  style?: React.CSSProperties;
}
const IconComponent: FC<Props> = ({
  iconName,
  size = 24,
  fillColor = Colors.black,
  opacity,
  margin,
  mr,
  ml,
  mt,
  mb,
  style,
  background,
  cursor,
  transform,
}) => {
  const SvgIcon = useMemo(() => svgMap[iconName], [iconName]);
  return (
    <Container
      margin={margin}
      mr={mr}
      ml={ml}
      mt={mt}
      mb={mb}
      style={style}
      background={background}
      cursor={cursor}
      transform={transform}
    >
      <SvgIcon size={size} fillColor={fillColor} opacity={opacity} />
    </Container>
  );
};

const Container = styled.div<MarginProps & BackgroundProps & CursorProps & TransformProps>`
  ${margin}
  ${background}
  ${cursor}
  ${transform}
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export type IconName = keyof typeof svgMap;
export const Icon = memo(IconComponent);
