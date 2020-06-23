import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgPresentation = (props: SvgIconProps) => (
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
      d="M22 4h-1v10a2 2 0 01-2 2h-6v1.434l4.515 2.708-1.03 1.716L13 19.766V22h-2v-2.234l-3.486 2.092-1.029-1.716L11 17.434V16H5a2 2 0 01-2-2V4H2V2h20v2zM5 4v10h14V4H5zm3 8h2V8H8v4zm5 0h-2V6h2v6zm1 0h2V9h-2v3z"
      fill="#000"
    />
  </svg>
);
