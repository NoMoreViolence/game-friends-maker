import { css } from 'styled-components';

export interface BackgroundCss {
  backgroundColor?: string;
}

export const backgroundCss = css<BackgroundCss>`
  ${({ backgroundColor }) => (backgroundColor ? `background-color: ${backgroundColor};` : '')}
`;
