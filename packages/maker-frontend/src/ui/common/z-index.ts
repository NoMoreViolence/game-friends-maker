import { css } from 'styled-components';

export interface ZIndexCss {
  zIndex?: number;
}
export const zIndexCss = css<ZIndexCss>`
  ${props => (props.zIndex ? `z-index: ${props.zIndex};` : '')}
`;
