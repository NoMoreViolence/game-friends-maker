import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgVideo = (props: SvgIconProps) => (
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
      d="M3 5h12a2 2 0 012 2v1.382l6-3v13.236l-6-3V17a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2zm14 8.382l4 2V8.618l-4 2v2.764zM3 7v10h12V7H3z"
      fill="#000"
    />
  </svg>
);
