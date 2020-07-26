import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgAlarmPlus = (props: SvgIconProps) => (
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
      d="M6.207 2.707L4.793 1.293l-3.5 3.5 1.414 1.414 3.5-3.5zm13-1.414l3.5 3.5-1.414 1.414-3.5-3.5 1.414-1.414zM2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12zm18 0a8 8 0 11-16 0 8 8 0 0116 0zm-9 1H8v-2h3V8h2v3h3v2h-3v3h-2v-3z"
      fill={props.fillColor}
    />
  </svg>
);
