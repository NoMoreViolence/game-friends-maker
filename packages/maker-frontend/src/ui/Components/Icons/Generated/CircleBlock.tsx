import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCircleBlock = (props: SvgIconProps) => (
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
      d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm7.032-5.382a9 9 0 00-12.65-12.65l12.65 12.65zm-1.414 1.414a9 9 0 01-12.65-12.65l12.65 12.65z"
      fill="#000"
    />
  </svg>
);
