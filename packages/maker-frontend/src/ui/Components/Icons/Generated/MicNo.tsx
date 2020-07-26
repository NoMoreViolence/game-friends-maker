import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMicNo = (props: SvgIconProps) => (
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
      d="M8 9.414L1.293 2.707l1.414-1.414 20 20-1.414 1.414-4.387-4.387A7.96 7.96 0 0113 19.938V21h3v2H8v-2h3v-1.062A8.001 8.001 0 014 12v-2h2v2a6 6 0 009.476 4.89l-1.444-1.444A4 4 0 018 12V9.414zm4.518 4.518A2 2 0 0110 12v-.586l2.518 2.518zM14 5v4.786l2 2V5a4 4 0 00-7.855-1.07L10 5.786V5a2 2 0 014 0zm5.358 10.144l-1.567-1.568c.136-.502.209-1.03.209-1.576v-2h2v2c0 1.116-.229 2.18-.642 3.144z"
      fill={props.fillColor}
    />
  </svg>
);
