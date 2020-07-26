import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgAlarmNo = (props: SvgIconProps) => (
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
      d="M2.336 3.75L1.293 4.793l1.414 1.414L3.75 5.164l.507.507A9.959 9.959 0 002 12c0 5.523 4.477 10 10 10a9.959 9.959 0 006.329-2.257l2.964 2.964 1.414-1.414-20-20-1.414 1.414L2.336 3.75zm14.57 14.57L5.68 7.094A8 8 0 0016.906 18.32zM20 12a7.975 7.975 0 01-.642 3.144l1.5 1.5A9.957 9.957 0 0022 12c0-5.523-4.477-10-10-10a9.957 9.957 0 00-4.644 1.142l1.5 1.5A8 8 0 0120 12zm-.793-10.707l3.5 3.5-1.414 1.414-3.5-3.5 1.414-1.414z"
      fill={props.fillColor}
    />
  </svg>
);
