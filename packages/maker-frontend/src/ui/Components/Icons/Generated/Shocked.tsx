import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgShocked = (props: SvgIconProps) => (
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
      d="M1 12c0 6.075 4.925 11 11 11s11-4.925 11-11S18.075 1 12 1 1 5.925 1 12zm20 0a9 9 0 11-18 0 9 9 0 0118 0zm-9-2a4 4 0 014 4v1a4 4 0 01-8 0v-1a4 4 0 014-4zm-2 4a2 2 0 114 0v1a2 2 0 11-4 0v-1zm5-7h2v2h-2V7zM9 7H7v2h2V7z"
      fill="#000"
    />
  </svg>
);
