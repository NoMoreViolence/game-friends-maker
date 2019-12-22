import { css } from 'styled-components';

export interface FlexboxCss {
  isFlex?: boolean; // true
  flex?: number; // 0
  flexGrow?: number; // 0
  flexShrink?: number; // 0
  flexBasis?: number; // 'auto'
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'unset'; // 'start'
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | 'unset'; // 'row'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'unset'; // 'center'
}

export const flexboxCss = css<FlexboxCss>`
  ${({ isFlex, flex, flexGrow, flexShrink, flexBasis, flexWrap, flexDirection, justifyContent, alignItems }) => {
    if (isFlex) {
      return `
          display: flex;
          ${typeof flex === 'number' ? `flex: ${flex}` : ''};
          ${typeof flexGrow === 'number' ? `flex-grow: ${flexGrow}` : ''};
          ${typeof flexShrink === 'number' ? `flex-shrink: ${flexShrink}` : ''};
          ${typeof flexBasis === 'number' ? `flex-basis: ${flexBasis}` : ''};
          ${typeof flexWrap === 'number' ? `flex-wrap ${flexWrap};` : ''}
          justify-content: ${justifyContent || 'flex-start'};
          flex-direction: ${flexDirection || 'row'};
          align-items: ${alignItems || 'center'};
        `;
    }
    return ``;
  }}
`;
