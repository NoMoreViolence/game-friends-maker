import React, { FC, useState, useCallback } from 'react';
import { CircleProps, Circle } from './circle';
import styled from 'styled-components';

interface Props extends CircleProps {
  imageUrl: string;
  replaceText?: string; // only one letter
}
export const ImageCircle: FC<Props> = ({
  imageUrl,
  replaceText,
  size,
  mt,
  mb,
  mr,
  ml,
  backgroundColor,
  borderColor,
  borderStyle,
  borderWidth,
}) => {
  const [onError, setOnError] = useState(false);
  const handleLoad = useCallback(() => setOnError(false), []);
  const handleError = useCallback(() => setOnError(true), []);

  return (
    <Circle
      size={size}
      mt={mt}
      mb={mb}
      mr={mr}
      ml={ml}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
    >
      {!onError ? (
        <StyledImgCircle size={size} src={imageUrl} onLoad={handleLoad} onError={handleError} />
      ) : (
        <StyledReplaceText size={size}>{replaceText?.charAt(0)}</StyledReplaceText>
      )}
    </Circle>
  );
};
const StyledImgCircle = styled.img<{ size: number }>`
  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
  `}
`;
const StyledReplaceText = styled.span<{ size: number }>`
  ${({ size }) => `
    font-size: ${size * 0.66}px;
  `}
`;
