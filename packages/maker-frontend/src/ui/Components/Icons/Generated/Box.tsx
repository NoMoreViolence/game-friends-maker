import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBox = (props: SvgIconProps) => (
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
      d="M20 19V9a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2v10a2 2 0 002 2h12a2 2 0 002-2zM6 19V9h12v10H6zm3-7v-2h6v2H9zM4 7V5h16v2H4z"
      fill={props.fillColor}
    />
  </svg>
);
