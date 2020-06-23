import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMoreVertical = (props: SvgIconProps) => (
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
      d="M10 5a2 2 0 104 0 2 2 0 00-4 0zm2 9a2 2 0 110-4 2 2 0 010 4zm0 7a2 2 0 110-4 2 2 0 010 4z"
      fill="#000"
    />
  </svg>
);
