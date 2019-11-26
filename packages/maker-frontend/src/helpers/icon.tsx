import React, { FC, CSSProperties } from 'react';
import styled from 'styled-components';
import { MarginCss, PaddingCss, marginCss, paddingCss } from 'ui';

// SVG기반 아이콘 이라서 width, height 만 정해주면 아이콘 사이즈가 따라오지 않음
// 가로 세로 크기가 같을수밖에 없음
// example:) width: (20px), height: (20px), font-size: (20px)
interface Props extends React.DOMAttributes<HTMLElement>, MarginCss, PaddingCss {
  iconStyle: CSSProperties;
  iconClass: string;
  pointer?: boolean; // false
}

const Icon: FC<Props> = ({ iconStyle, iconClass, ...props }: Props) => {
  return <IStyled style={iconStyle} className={iconClass} {...props}></IStyled>;
};

interface IStyledProps extends MarginCss, PaddingCss {
  pointer?: boolean;
}
const IStyled = styled.i<IStyledProps>`
  ${marginCss}
  ${paddingCss}
  ${({ pointer }) => (pointer ? 'cursor: pointer;' : '')}
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
