import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgAlarmSnooze = (props: SvgIconProps) => (
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
      d="M4.793 1.293l1.414 1.414-3.5 3.5-1.414-1.414 3.5-3.5zm17.914 3.5l-3.5-3.5-1.414 1.414 3.5 3.5 1.414-1.414zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zM9 8v2h3.131l-4 6H15v-2h-3.132l4-6H9z"
      fill={props.fillColor}
    />
  </svg>
);
