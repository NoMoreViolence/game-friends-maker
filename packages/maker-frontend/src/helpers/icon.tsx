import React, { FC, CSSProperties } from 'react';
import styled from 'styled-components';

// SVG기반 아이콘 이라서 width, height 만 정해주면 아이콘 사이즈가 따라오지 않음
// width height와 맞는 폰트 사이즈를 넣어줘야함
// example:) width: (2.5rem), height: (2.5rem), font-size: (2.5rem)
interface Props extends React.DOMAttributes<HTMLElement> {
  iconStyle: CSSProperties;
  iconClass: string;
}

const IconComponent: FC<Props> = ({ iconStyle, iconClass, ...props }: Props) => {
  return <IStyled style={iconStyle} className={iconClass} {...props}></IStyled>;
};

const IStyled = styled.i`
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    margin-right: unset !important;
    margin-left: unset !important;
  }
`;

export { IconComponent };
