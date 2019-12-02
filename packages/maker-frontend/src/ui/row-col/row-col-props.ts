import { css } from 'styled-components';
import {
  MarginCss,
  marginCss,
  PaddingCss,
  paddingCss,
  WidthHeightCss,
  widthHeightCss,
  ZIndexCss,
  zIndexCss,
} from '../common';

export interface RowColProps extends MarginCss, PaddingCss, WidthHeightCss, ZIndexCss {
  flex?: number; // 0
  flexGrow?: number; // 0
  flexShrink?: number; // 0
  flexBasis?: number; // 'auto'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial';
  isReversed?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'unset'; // 'start'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'unset'; // 'center'
  backgroundColor?: string;
  style?: React.CSSProperties;
}

export const rowColBaseStyle = css<RowColProps>`
  ${marginCss}
  ${paddingCss}
  ${widthHeightCss}
  ${zIndexCss}
  ${props => (typeof props.flex === 'number' ? `flex: ${props.flex};` : '')}
  ${props => (typeof props.flexGrow === 'number' ? `flex-grow: ${props.flexGrow};` : '')}
  ${props => (typeof props.flexShrink === 'number' ? `flex-shrink: ${props.flexShrink};` : '')}
  ${props => (typeof props.flexBasis === 'number' ? `flex-basis: ${props.flexBasis};` : '')}
  ${props => (props.flexWrap ? `flex-wrap ${props.flexWrap};` : '')}
  box-sizing: border-box;
  display: flex;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'center'};
`;
