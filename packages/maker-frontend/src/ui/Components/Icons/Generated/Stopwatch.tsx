import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgStopwatch = (props: SvgIconProps) => (
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
      d="M11 4.055V3h-1V1h4v2h-1v1.055a8.957 8.957 0 014.617 1.912l1.674-1.681 1.418 1.41-1.678 1.686A9 9 0 113 13c0-4.633 3.5-8.448 8-8.945zM12 20a7 7 0 100-14 7 7 0 000 14zm1-6V8h-2v6h2z"
      fill="#000"
    />
  </svg>
);
