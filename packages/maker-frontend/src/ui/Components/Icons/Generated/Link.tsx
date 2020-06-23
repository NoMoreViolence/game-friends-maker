import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgLink = (props: SvgIconProps) => (
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
      d="M10 15v2H6A5 5 0 016 7h4v2H6a3 3 0 100 6h4zm4-6V7h4a5 5 0 010 10h-4v-2h4a3 3 0 100-6h-4zm3 2H7v2h10v-2z"
      fill="#000"
    />
  </svg>
);
