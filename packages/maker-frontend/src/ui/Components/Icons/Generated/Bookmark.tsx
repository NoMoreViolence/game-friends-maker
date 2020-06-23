import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBookmark = (props: SvgIconProps) => (
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
      d="M5 22.618l7-3.5 7 3.5V4a2 2 0 00-2-2H7a2 2 0 00-2 2v18.618zm7-5.736l-5 2.5V4h10v15.382l-5-2.5z"
      fill="#000"
    />
  </svg>
);
