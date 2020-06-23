import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTable = (props: SvgIconProps) => (
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
      d="M9 4h12a2 2 0 012 2v13a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h6zM7 6H3v3h4V6zm2 3V6h12v3H9zm-2 2H3v3h4v-3zm2 3v-3h12v3H9zm-2 2H3v3h4v-3zm2 3v-3h12v3H9z"
      fill="#000"
    />
  </svg>
);
