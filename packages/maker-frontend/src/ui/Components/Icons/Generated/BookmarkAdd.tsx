import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBookmarkAdd = (props: SvgIconProps) => (
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
      d="M17 17v2.382l-5-2.5-5 2.5V4h10v1h2V4a2 2 0 00-2-2H7a2 2 0 00-2 2v18.618l7-3.5 7 3.5V17h-2zm1-9v2h-2v2h2v2h2v-2h2v-2h-2V8h-2z"
      fill="#000"
    />
  </svg>
);
