import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCalendarDates = (props: SvgIconProps) => (
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
      d="M8 6H6V5H4v3h16V5h-2v1h-2V5H8v1zm12 4H4v10h16V10zm-4-7H8V2H6v1H4a2 2 0 00-2 2v15a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2h-2V2h-2v1zM7 14v-2h2v2H7zm4 0h2v-2h-2v2zm4 0v-2h2v2h-2zm-8 2v2h2v-2H7zm6 2h-2v-2h2v2z"
      fill={props.fillColor}
    />
  </svg>
);
