import { css } from 'styled-components';

export interface TransformProps {
  transform?: string;
}
export const transform = css<TransformProps>`
  ${({ transform }) => {
    if (transform) {
      return `transform: ${transform};`;
    }
    return '';
  }}
`;
