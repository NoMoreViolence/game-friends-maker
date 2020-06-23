import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTextUnderline = (props: SvgIconProps) => (
  <svg
    width={props.size}
    height={props.size}
    fill="none"
    viewBox="0 0 24 24"
    fillOpacity={typeof props.opacity === 'number' ? props.opacity : 1}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 2h-2v9c0 3.314-1.686 5-5 5s-5-1.686-5-5V2H5v9c0 4.418 2.582 7 7 7s7-2.582 7-7V2zM4 20v2h16v-2H4z"
      fill="#000"
    />
  </svg>
);
