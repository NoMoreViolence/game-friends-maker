import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgPulse = (props: SvgIconProps) => (
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
      d="M3.818 2h16.364C21.186 2 22 2.995 22 4.222V19.778C22 21.005 21.186 22 20.182 22H3.818C2.814 22 2 21.005 2 19.778V4.222C2 2.995 2.814 2 3.818 2zM20 11V4H4v7h3.414l2.249 2.248 3.1-7.232L16.5 11H20zM4 13h2.586l3.751 3.752 2.9-6.768L15.5 13H20v7H4v-7z"
      fill="#000"
    />
  </svg>
);
