import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTextAlignLeft = (props: SvgIconProps) => (
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
      d="M22 7V5H2v2h20zm-6 2v2H2V9h14zm6 6v-2H2v2h20zm-6 4v-2H2v2h14z"
      fill={props.fillColor}
    />
  </svg>
);
