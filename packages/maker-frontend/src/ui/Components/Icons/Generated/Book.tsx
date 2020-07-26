import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBook = (props: SvgIconProps) => (
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
      d="M21 22H6a3 3 0 01-3-3V5a3 3 0 013-3h15v16a1 1 0 100 2v2zm-3-3c0-.35.06-.687.17-1H6a1 1 0 100 2h12.17c-.11-.313-.17-.65-.17-1zM6 4h13v12H6c-.35 0-.687.06-1 .17V5a1 1 0 011-1z"
      fill={props.fillColor}
    />
  </svg>
);
