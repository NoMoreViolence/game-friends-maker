import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCut = (props: SvgIconProps) => (
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
      d="M17.806 1.442l1.66 1.116-6.26 9.299 2.35 3.49a4 4 0 11-1.625 1.167l-1.931-2.867-1.93 2.867a4 4 0 11-1.625-1.167l2.35-3.49-6.26-9.299 1.659-1.116L12 10.066l5.806-8.624zM9 19.078a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
      fill={props.fillColor}
    />
  </svg>
);
