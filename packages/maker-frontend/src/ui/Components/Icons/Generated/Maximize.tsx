import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMaximize = (props: SvgIconProps) => (
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
      d="M4 4v8H2V2h10v2H4zm11.707 5.707L20 5.414V9h2V2h-7v2h3.586l-4.293 4.293 1.414 1.414zM20 12v8h-8v2h10V12h-2zM9 22v-2H5.414l4.293-4.293-1.414-1.414L4 18.586V15H2v7h7z"
      fill={props.fillColor}
    />
  </svg>
);
