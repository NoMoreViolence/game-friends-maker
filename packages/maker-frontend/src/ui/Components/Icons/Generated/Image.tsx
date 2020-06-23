import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgImage = (props: SvgIconProps) => (
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
      d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v11.586l4-4 3.5 3.5 6.5-6.5 2 2V4H4zm0 16v-1.586l4-4L13.586 20H4zm16 0h-3.586l-3.5-3.5L18 11.414l2 2V20zM14 8a3 3 0 10-6 0 3 3 0 006 0zm-4 0a1 1 0 112 0 1 1 0 01-2 0z"
      fill="#000"
    />
  </svg>
);
