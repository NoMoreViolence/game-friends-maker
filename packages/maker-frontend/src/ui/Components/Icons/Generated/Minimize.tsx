import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMinimize = (props: SvgIconProps) => (
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
      d="M21 10V8h-3.586l4.293-4.293-1.414-1.414L16 6.586V3h-2v7h7zM7 7v5H5V5h7v2H7zm10 5v5h-5v2h7v-7h-2zM3.707 21.707L8 17.414V21h2v-7H3v2h3.586l-4.293 4.293 1.414 1.414z"
      fill={props.fillColor}
    />
  </svg>
);
