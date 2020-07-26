import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgDashboard = (props: SvgIconProps) => (
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
      d="M5.398 21.8A10.983 10.983 0 011 13C1 6.925 5.925 2 12 2s11 4.925 11 11c0 3.504-1.65 6.735-4.398 8.8l-.267.2H5.665l-.267-.2zm12.26-1.8a9 9 0 10-11.315 0h11.314zm-.339-12.427l-1.638-1.146-2.633 3.761a3 3 0 101.538 1.29l2.733-3.905zM13 13a1 1 0 11-2 0 1 1 0 012 0z"
      fill={props.fillColor}
    />
  </svg>
);
