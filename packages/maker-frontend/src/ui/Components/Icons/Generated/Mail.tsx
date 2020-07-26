import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMail = (props: SvgIconProps) => (
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
      d="M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm0 6.618V19h18V9.619l-9 4.5-9-4.5zm0-2.236l9 4.5 9-4.5V5H3v2.382z"
      fill={props.fillColor}
    />
  </svg>
);
