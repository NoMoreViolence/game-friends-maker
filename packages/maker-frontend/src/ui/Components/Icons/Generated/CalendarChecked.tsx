import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCalendarChecked = (props: SvgIconProps) => (
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
      d="M8 6H6V5H4v3h16V5h-2v1h-2V5H8v1zM4 20V10h16v10H4zM16 3H8V2H6v1H4a2 2 0 00-2 2v15a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2h-2V2h-2v1zm-.707 8.293L11 15.586l-2.293-2.293-1.414 1.414L11 18.414l5.707-5.707-1.414-1.414z"
      fill="#000"
    />
  </svg>
);
