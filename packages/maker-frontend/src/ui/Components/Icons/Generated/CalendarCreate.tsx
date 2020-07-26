import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCalendarCreate = (props: SvgIconProps) => (
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
      d="M6 6h2V5h8v1h2V5h2v3H4V5h2v1zm-2 4v10h10v2H4a2 2 0 01-2-2V5a2 2 0 012-2h2V2h2v1h8V2h2v1h2a2 2 0 012 2v9h-2v-4H4zm17 9v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z"
      fill={props.fillColor}
    />
  </svg>
);
