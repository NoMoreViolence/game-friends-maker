import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgScan = (props: SvgIconProps) => (
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
      d="M16 2h4.182C21.186 2 22 2.895 22 4v4h-2V4h-4V2zM2 13v-2h20v2H2zm14 9v-2h4v-4h2v4c0 1.105-.814 2-1.818 2H16zM3.818 22H8v-2H4v-4H2v4c0 1.105.814 2 1.818 2zM8 4V2H3.818C2.814 2 2 2.895 2 4v4h2V4h4z"
      fill="#000"
    />
  </svg>
);
