import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgSend = (props: SvgIconProps) => (
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
      d="M2.74 2.252l1.365 9.555.772.193-.772.193-1.365 9.555L22.236 12 2.74 2.252zm3.155 7.94L5.26 5.749 17.764 12 5.26 18.252l.635-4.445L13.123 12l-7.228-1.807z"
      fill="#000"
    />
  </svg>
);
