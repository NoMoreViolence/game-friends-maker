import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMic = (props: SvgIconProps) => (
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
      d="M12 1a4 4 0 014 4v7a4 4 0 01-8 0V5a4 4 0 014-4zm1 18.938V21h3v2H8v-2h3v-1.062A8.001 8.001 0 014 12v-2h2v2a6 6 0 0012 0v-2h2v2a8.001 8.001 0 01-7 7.938zM10 5a2 2 0 114 0v7a2 2 0 11-4 0V5z"
      fill="#000"
    />
  </svg>
);
