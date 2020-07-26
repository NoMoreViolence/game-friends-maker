import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgNeutral = (props: SvgIconProps) => (
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
      d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm-4-7v2h8v-2H8zm6-3V9h3v2h-3zM7 9v2h3V9H7z"
      fill={props.fillColor}
    />
  </svg>
);
