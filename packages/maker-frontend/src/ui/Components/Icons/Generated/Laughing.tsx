import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgLaughing = (props: SvgIconProps) => (
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
      d="M1 12c0 6.075 4.925 11 11 11s11-4.925 11-11S18.075 1 12 1 1 5.925 1 12zm20 0a9 9 0 11-18 0 9 9 0 0118 0zm-8.968 7c-3.357 0-5.226-1.768-5.226-5v-1h10.31l.027.972C17.236 17.215 15.4 19 12.033 19zm3.056-4c-.235 1.395-1.18 2-3.056 2-1.876 0-2.85-.61-3.135-2h6.19zM14 8h3v2h-3V8zm-4 0H7v2h3V8z"
      fill={props.fillColor}
    />
  </svg>
);
