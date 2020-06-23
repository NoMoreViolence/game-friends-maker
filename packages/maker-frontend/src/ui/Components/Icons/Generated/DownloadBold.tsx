import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgDownloadBold = (props: SvgIconProps) => (
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
      d="M7 7V4a2 2 0 012-2h6a2 2 0 012 2v7h5l-10 8.585L2 11h5V7zm8-3v9h1.297L12 16.95 7.703 13H9V4h6zm4 18a2 2 0 002-2H3a2 2 0 002 2h14z"
      fill="#000"
    />
  </svg>
);
