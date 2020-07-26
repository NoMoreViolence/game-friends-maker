import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgSearch = (props: SvgIconProps) => (
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
      d="M10 18a8 8 0 116.32-3.094l5.387 5.387-1.414 1.414-5.387-5.387A7.965 7.965 0 0110 18zm6-8a6 6 0 11-12 0 6 6 0 0112 0z"
      fill={props.fillColor}
    />
  </svg>
);
