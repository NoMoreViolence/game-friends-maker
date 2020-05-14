import styled from 'styled-components';
import { FontFamilyProps, FontSizeProps } from 'styled-system';
import { textStyles, TypoProps } from './styled';

export const SpanCustom = styled.span<TypoProps & FontFamilyProps & FontSizeProps>`
  ${textStyles.pxCustom}
`;
export const Span36 = styled.span<TypoProps>`
  ${textStyles.px36}
`;
export const Span24 = styled.span<TypoProps>`
  ${textStyles.px24}
`;
export const Span18 = styled.span<TypoProps>`
  ${textStyles.px18}
`;
export const Span16 = styled.span<TypoProps>`
  ${textStyles.px16}
`;
export const Span14 = styled.span<TypoProps>`
  ${textStyles.px14}
`;
export const Span12 = styled.span<TypoProps>`
  ${textStyles.px12}
`;
export const Span10 = styled.span<TypoProps>`
  ${textStyles.px10}
`;

export const Label36 = styled.label<TypoProps>`
  ${textStyles.px36}
`;
export const Label24 = styled.label<TypoProps>`
  ${textStyles.px24}
`;
export const Label18 = styled.label<TypoProps>`
  ${textStyles.px18}
`;
export const Label16 = styled.label<TypoProps>`
  ${textStyles.px16}
`;
export const Label14 = styled.label<TypoProps>`
  ${textStyles.px14}
`;
export const Label12 = styled.label<TypoProps>`
  ${textStyles.px12}
`;
export const Label10 = styled.label<TypoProps>`
  ${textStyles.px10}
`;
