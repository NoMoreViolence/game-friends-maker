import { css } from 'styled-components';
import { color as Colors } from 'styles';

export interface ColorCss {
  color?: string;
}

export const colorCss = css<ColorCss>`
  color: ${({ color }) => (color ? color : Colors.black)};
`;
