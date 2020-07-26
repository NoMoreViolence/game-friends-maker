import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgStarNo = (props: SvgIconProps) => (
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
      d="M6.851 8.266L1.293 2.707l1.414-1.414 20 20-1.414 1.414-2.563-2.563.476 2.774L12 19.13l-7.206 3.788 1.376-8.024L.34 9.212l6.511-.946zm9.43 9.43l.269 1.566L12 16.87l-4.55 2.392.87-5.066-3.682-3.588 3.978-.578 7.665 7.665zm3.08-7.088l-2.298 2.24 1.414 1.415 5.183-5.051-8.057-1.171L12 .74 9.672 5.457l1.493 1.493L12 5.26l2.275 4.609 5.087.74z"
      fill={props.fillColor}
    />
  </svg>
);
