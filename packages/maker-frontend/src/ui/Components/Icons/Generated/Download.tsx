import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgDownload = (props: SvgIconProps) => (
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
      d="M16.293 9.293L13 12.586V2h-2v10.586L7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707-1.414-1.414zM22 20v-4h-2v4H4v-4H2v4a2 2 0 002 2h16a2 2 0 002-2z"
      fill={props.fillColor}
    />
  </svg>
);
