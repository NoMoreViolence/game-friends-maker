import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCalendarDelete = (props: SvgIconProps) => (
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
      d="M8 6H6V5H4v3h16V5h-2v1h-2V5H8v1zM4 20V10h16v10H4zM16 3H8V2H6v1H4a2 2 0 00-2 2v15a2 2 0 002 2h16a2 2 0 002-2V5a2 2 0 00-2-2h-2V2h-2v1zm-1.707 8.293L12 13.586l-2.293-2.293-1.414 1.414L10.586 15l-2.293 2.293 1.414 1.414L12 16.414l2.293 2.293 1.414-1.414L13.414 15l2.293-2.293-1.414-1.414z"
      fill="#000"
    />
  </svg>
);
