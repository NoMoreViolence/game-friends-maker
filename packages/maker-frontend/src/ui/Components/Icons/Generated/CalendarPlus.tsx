import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCalendarPlus = (props: SvgIconProps) => (
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
      d="M6 6h2V5h8v1h2V5h2v3H4V5h2v1zm-2 4v10h16V10H4zm4-7h8V2h2v1h2a2 2 0 012 2v15a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h2V2h2v1zm0 13v-2h3v-3h2v3h3v2h-3v3h-2v-3H8z"
      fill="#000"
    />
  </svg>
);
