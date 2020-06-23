import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgList = (props: SvgIconProps) => (
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
      d="M2 6a2 2 0 104 0 2 2 0 00-4 0zm6-1h14v2H8V5zm14 6H8v2h14v-2zM8 19h14v-2H8v2zm-6-1a2 2 0 104 0 2 2 0 00-4 0zm2-4a2 2 0 110-4 2 2 0 010 4z"
      fill="#000"
    />
  </svg>
);
