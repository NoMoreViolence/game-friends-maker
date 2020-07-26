import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgToggleRight = (props: SvgIconProps) => (
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
      d="M17 5H7a7 7 0 000 14h10a7 7 0 100-14zM2 12a5 5 0 015-5h10a5 5 0 010 10H7a5 5 0 01-5-5zm15 4a4 4 0 110-8 4 4 0 010 8zm2-4a2 2 0 11-4 0 2 2 0 014 0z"
      fill={props.fillColor}
    />
  </svg>
);
