import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTextColor = (props: SvgIconProps) => (
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
      d="M17 16l-1.588-4H8.588L7 16H5l6.003-15H13l6 15h-2zm3 4a2 2 0 00-2-2H6a2 2 0 00-2 2v1a2 2 0 002 2h12a2 2 0 002-2v-1zM6 21v-1h12v1H6zm6-17.593L14.618 10H9.382L12 3.407z"
      fill="#000"
    />
  </svg>
);
