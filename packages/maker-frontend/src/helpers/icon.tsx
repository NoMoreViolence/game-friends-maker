import React, { FC, CSSProperties } from 'react';
import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss } from 'ui';
import { PointerCss, pointerCss } from 'ui/common/pointer';

// SVG기반 아이콘 이라서 width, height 만 정해주면 아이콘 사이즈가 따라오지 않음
// 가로 세로 크기가 같을수밖에 없음
// example:) width: (20px), height: (20px), font-size: (20px)
interface Props extends React.DOMAttributes<HTMLElement>, MarginCss, PaddingCss, PointerCss {
  iconStyle?: CSSProperties;
  iconSize?: number;
  iconClass: string;
}

const Icon: FC<Props> = ({ iconStyle, iconSize, iconClass, ...props }: Props) => {
  return <IStyled style={iconStyle} iconSize={iconSize} className={iconClass} {...props}></IStyled>;
};

interface IStyledProps extends MarginCss, PaddingCss {
  pointer?: boolean;
  iconSize?: number;
}
const IStyled = styled.i<IStyledProps>`
  ${marginCss}
  ${paddingCss}
  ${pointerCss}
  ${({ iconSize }) => (iconSize ? `font-size: ${iconSize}px;` : '')}
  display: flex;
  justify-content: center;
  align-items: center;


  ::before {
    ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')}
    margin-right: unset !important;
    margin-left: unset !important;
  }
`;

export { Icon };
