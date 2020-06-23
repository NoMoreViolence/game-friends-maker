import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCircle = (props: SvgIconProps) => (
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
      d="M1 12c0 6.075 4.925 11 11 11s11-4.925 11-11S18.075 1 12 1 1 5.925 1 12zm20 0a9 9 0 11-18 0 9 9 0 0118 0z"
      fill="#000"
    />
  </svg>
);
