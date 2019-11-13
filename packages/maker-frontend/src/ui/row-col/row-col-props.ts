import { css } from 'styled-components';
import { MarginCss, marginCss, PaddingCss, paddingCss } from '../common';

export interface RowColProps extends MarginCss, PaddingCss {
  flex?: number; // 0
  flexGrow?: number; // 0
  flexShrink?: number; // 0
  flexBasis?: number; // 'auto'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial';
  width?: number | string; // 'auto'
  height?: number | string; // 'auto'
  isReversed?: boolean;
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'; // 'start'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'; // 'center'
  backgroundColor?: string;
  style?: React.CSSProperties;
}

export const rowColBaseStyle = css<RowColProps>`
  ${marginCss}
  ${paddingCss}
  ${props => (typeof props.flex === 'number' ? `flex: ${props.flex};` : '')}
  ${props => (typeof props.flexGrow === 'number' ? `flex-grow: ${props.flexGrow};` : '')}
  ${props => (typeof props.flexShrink === 'number' ? `flex-shrink: ${props.flexShrink};` : '')}
  ${props => (typeof props.flexBasis === 'number' ? `flex-basis: ${props.flexBasis};` : '')}
  ${props => (props.flexWrap ? `flex-wrap ${props.flexWrap};` : '')}
  ${props =>
    props.width
      ? typeof props.width === 'number'
        ? `width: ${props.width}px;`
        : `width: ${props.width};`
      : `width: auto;`}
  ${props =>
    props.height
      ? typeof props.height === 'number'
        ? `height: ${props.height}px;`
        : `height: ${props.height};`
      : `height: auto;`}
  display: flex;
  background-color: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : 'transparent')};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'center'};
`;
