import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCheckMark = (props: SvgIconProps) => (
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
      d="M9.707 14.293L19 5l1.414 1.414L9.707 17.121 4 11.414 5.414 10l4.293 4.293z"
      fill={props.fillColor}
    />
  </svg>
);
