import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgStar = (props: SvgIconProps) => (
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
      d="M6.17 14.894l-1.376 8.024L12 19.13l7.206 3.788-1.376-8.024 5.83-5.682-8.057-1.171L12 .74l-3.603 7.3L.34 9.21l5.83 5.683zm9.51-.698l.87 5.066L12 16.87l-4.55 2.392.87-5.066-3.682-3.588 5.087-.74L12 5.26l2.275 4.609 5.087.74-3.681 3.587z"
      fill={props.fillColor}
    />
  </svg>
);
