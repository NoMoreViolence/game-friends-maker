import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgPrinter = (props: SvgIconProps) => (
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
      d="M4 7h2V2h12v5h2a2 2 0 012 2v8a2 2 0 01-2 2h-2v3H6v-3H4a2 2 0 01-2-2V9a2 2 0 012-2zm12 0H8V4h8v3zm4 2v8h-2v-2H6v2H4V9h16zm-4 8H8v3h8v-3zm3-6a1 1 0 10-2 0 1 1 0 002 0z"
      fill="#000"
    />
  </svg>
);
