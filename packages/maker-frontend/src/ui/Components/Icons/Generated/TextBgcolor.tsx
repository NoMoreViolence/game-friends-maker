import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTextBgcolor = (props: SvgIconProps) => (
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
      d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zM4 20V4h16v16H4zm10.8-5H9.2L8 18H6l5-12h2l5 12h-2l-1.2-3zM12 8l2 5h-4l2-5z"
      fill="#000"
    />
  </svg>
);
