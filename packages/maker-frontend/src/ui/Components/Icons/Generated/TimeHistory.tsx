import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTimeHistory = (props: SvgIconProps) => (
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
      d="M8 6H5.114C7.044 3.791 9.16 3 12 3a9 9 0 11-9 9H1c0 6.075 4.925 11 11 11s11-4.925 11-11S18.075 1 12 1c-3.213 0-5.763.91-8 3.256V1.991H2V8h6V6zm9 5h-4V6h-2v7h6v-2z"
      fill="#000"
    />
  </svg>
);
