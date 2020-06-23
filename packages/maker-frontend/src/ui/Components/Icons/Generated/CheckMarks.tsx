import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCheckMarks = (props: SvgIconProps) => (
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
      d="M14.62 6l-8.074 8.2-3.192-3.25-1.38 1.4L6.546 17 16 7.4 14.62 6zm-3.954 9.094L12.546 17 22 7.4 20.62 6l-8.074 8.2-.5-.507-1.38 1.401z"
      fill="#000"
    />
  </svg>
);
