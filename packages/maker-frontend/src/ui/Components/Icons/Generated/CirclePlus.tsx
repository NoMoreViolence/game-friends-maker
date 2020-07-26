import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCirclePlus = (props: SvgIconProps) => (
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
      d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm5-10h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"
      fill={props.fillColor}
    />
  </svg>
);
