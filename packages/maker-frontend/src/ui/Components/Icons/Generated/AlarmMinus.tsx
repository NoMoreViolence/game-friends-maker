import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgAlarmMinus = (props: SvgIconProps) => (
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
      d="M4.793 1.293l1.414 1.414-3.5 3.5-1.414-1.414 3.5-3.5zm17.914 3.5l-3.5-3.5-1.414 1.414 3.5 3.5 1.414-1.414zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-4-9v2h8v-2H8z"
      fill={props.fillColor}
    />
  </svg>
);
