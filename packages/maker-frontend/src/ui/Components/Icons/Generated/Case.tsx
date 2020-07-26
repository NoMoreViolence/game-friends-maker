import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCase = (props: SvgIconProps) => (
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
      d="M10 3h4a2 2 0 012 2v1h4a2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h4V5a2 2 0 012-2zM4 8h16v5H4V8zm0 11v-4h7v1h2v-1h7v4H4zM14 5v1h-4V5h4z"
      fill={props.fillColor}
    />
  </svg>
);
