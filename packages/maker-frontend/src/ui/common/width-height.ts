import { css } from 'styled-components';

export interface WidthHeightCss {
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
}
export const widthHeightCss = css<WidthHeightCss>`
  ${props =>
    props.width
      ? typeof props.width === 'number'
        ? `width: ${props.width}px;`
        : `width: ${props.width};`
      : `width: unset;`}
  ${props =>
    props.height
      ? typeof props.height === 'number'
        ? `height: ${props.height}px;`
        : `height: ${props.height};`
      : `height: unset;`}
  ${props =>
    props.maxWidth
      ? typeof props.maxWidth === 'number'
        ? `max-width: ${props.maxWidth}px;`
        : `max-width: ${props.maxWidth};`
      : `max-width: unset;`}
  ${props =>
    props.maxHeight
      ? typeof props.maxHeight === 'number'
        ? `max-height: ${props.maxHeight}px;`
        : `max-height: ${props.maxHeight};`
      : `max-height: unset;`}
`;
