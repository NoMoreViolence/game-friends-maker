import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgMinus = (props: SvgIconProps) => (
  <svg
    width={props.size}
    height={props.size}
    fill="none"
    viewBox="0 0 24 24"
    fillOpacity={typeof props.opacity === 'number' ? props.opacity : 1}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M22 11v2H2v-2h20z" fill={props.fillColor} />
  </svg>
);
