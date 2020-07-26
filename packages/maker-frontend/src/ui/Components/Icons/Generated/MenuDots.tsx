import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMenuDots = (props: SvgIconProps) => (
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
      d="M18 4a2 2 0 104 0 2 2 0 00-4 0zm2 10a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4zm-2-10a2 2 0 104 0 2 2 0 00-4 0zm2-6a2 2 0 110-4 2 2 0 010 4zM2 20a2 2 0 104 0 2 2 0 00-4 0zm2-6a2 2 0 110-4 2 2 0 010 4zM2 4a2 2 0 104 0 2 2 0 00-4 0z"
      fill={props.fillColor}
    />
  </svg>
);
