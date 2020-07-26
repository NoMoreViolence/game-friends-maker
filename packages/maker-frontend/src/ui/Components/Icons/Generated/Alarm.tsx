import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgAlarm = (props: SvgIconProps) => (
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
      d="M6.207 2.707L4.793 1.293l-3.5 3.5 1.414 1.414 3.5-3.5zm13-1.414l3.5 3.5-1.414 1.414-3.5-3.5 1.414-1.414zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm5-9h-4V6h-2v7h6v-2z"
      fill={props.fillColor}
    />
  </svg>
);
