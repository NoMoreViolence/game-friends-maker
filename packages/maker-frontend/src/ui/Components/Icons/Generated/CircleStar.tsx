import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCircleStar = (props: SvgIconProps) => (
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
      d="M1 12c0 6.075 4.925 11 11 11s11-4.925 11-11S18.075 1 12 1 1 5.925 1 12zm20 0a9 9 0 11-18 0 9 9 0 0118 0zM7.582 17.939l.844-4.92L4.85 9.534l4.94-.717L12 4.34l2.21 4.477 4.939.717-3.575 3.485.844 4.92L12 15.616l-4.418 2.323zm5.843-5.619l.337 1.963L12 13.356l-1.762.927.337-1.963-1.426-1.389 1.97-.286L12 8.86l.881 1.785 1.97.286-1.426 1.39z"
      fill="#000"
    />
  </svg>
);
