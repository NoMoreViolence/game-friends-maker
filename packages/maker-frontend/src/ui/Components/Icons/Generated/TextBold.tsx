import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTextBold = (props: SvgIconProps) => (
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
      d="M16.43 11.348A5.502 5.502 0 0114.5 22H6V2h6.5a5.5 5.5 0 013.93 9.348zM12.5 11a3.5 3.5 0 100-7H8v7h4.5zM8 20v-7h6.5a3.5 3.5 0 110 7H8z"
      fill={props.fillColor}
    />
  </svg>
);
