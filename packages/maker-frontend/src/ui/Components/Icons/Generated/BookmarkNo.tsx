import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBookmarkNo = (props: SvgIconProps) => (
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
      d="M2.707 1.293L1.293 2.707 5 6.414v16.204l7-3.5 7 3.5v-2.204l2.293 2.293 1.414-1.414-20-20zM17 18.414l-10-10v10.968l5-2.5 5 2.5v-.968zM17 4v8.786l2 2V4a2 2 0 00-2-2H7c-.235 0-.461.04-.67.115L8.213 4H17z"
      fill={props.fillColor}
    />
  </svg>
);
