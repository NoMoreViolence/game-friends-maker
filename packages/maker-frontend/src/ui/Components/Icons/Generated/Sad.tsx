import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgSad = (props: SvgIconProps) => (
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
      d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm0-4.702c1.32 0 2.53.642 3.275 1.702l1.636-1.15A5.993 5.993 0 0012 14.297a5.993 5.993 0 00-4.91 2.551L8.724 18A3.993 3.993 0 0112 16.298zM14 12v-2h2v2h-2zm-6-2v2h2v-2H8z"
      fill="#000"
    />
  </svg>
);
