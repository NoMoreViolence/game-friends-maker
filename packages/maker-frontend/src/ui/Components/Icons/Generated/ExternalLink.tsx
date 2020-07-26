import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgExternalLink = (props: SvgIconProps) => (
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
      d="M11.704 13.707l7.293-7.293V11h2V3h-8v2h4.586l-7.293 7.293 1.414 1.414zM19 19v-5h-2v5H5V7h5V5H5a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z"
      fill={props.fillColor}
    />
  </svg>
);
