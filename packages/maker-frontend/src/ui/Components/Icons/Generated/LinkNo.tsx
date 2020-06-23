import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgLinkNo = (props: SvgIconProps) => (
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
      d="M1.293 2.707L5.6 7.016A5 5 0 006 17h4v-2H6a3 3 0 110-6h1.586l2 2H7v2h4.586l9.707 9.707 1.414-1.414-20-20-1.414 1.414zm17.739 12.11l1.497 1.497A5 5 0 0018 7h-4v2h4a3 3 0 011.032 5.818z"
      fill="#000"
    />
  </svg>
);
