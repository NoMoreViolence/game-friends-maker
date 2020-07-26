import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgFlag = (props: SvgIconProps) => (
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
      d="M7 23H4v-2h1V1h2v1h14.125l-2.999 6 3 6H7v7h1v2H7zm0-11V4h10.89l-2 4 2 4H7z"
      fill={props.fillColor}
    />
  </svg>
);
