import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgShareArrow = (props: SvgIconProps) => (
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
      d="M13 16V5.414l3.293 3.293 1.414-1.414L12 1.586 6.293 7.293l1.414 1.414L11 5.414V16h2zm8 4v-9h-2v9H5v-9H3v9a2 2 0 002 2h14a2 2 0 002-2z"
      fill={props.fillColor}
    />
  </svg>
);
