import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMoreHorizontal = (props: SvgIconProps) => (
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
      d="M5 14a2 2 0 110-4 2 2 0 010 4zm7 0a2 2 0 110-4 2 2 0 010 4zm5-2a2 2 0 104 0 2 2 0 00-4 0z"
      fill={props.fillColor}
    />
  </svg>
);
