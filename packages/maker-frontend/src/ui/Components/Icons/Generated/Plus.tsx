import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgPlus = (props: SvgIconProps) => (
  <svg
    width={props.size}
    height={props.size}
    fill="none"
    viewBox="0 0 24 24"
    fillOpacity={typeof props.opacity === 'number' ? props.opacity : 1}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M13 11h9v2h-9v9h-2v-9H2v-2h9V2h2v9z" fill="#000" />
  </svg>
);
