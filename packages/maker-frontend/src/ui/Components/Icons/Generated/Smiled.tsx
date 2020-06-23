import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgSmiled = (props: SvgIconProps) => (
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
      d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1s11 4.925 11 11-4.925 11-11 11zm0-2a9 9 0 100-18 9 9 0 000 18zm4.91-5.552l-1.635-1.15A3.993 3.993 0 0112 16c-1.32 0-2.53-.642-3.275-1.702l-1.636 1.15A5.993 5.993 0 0012 18a5.993 5.993 0 004.91-2.552zM14 11V9h2v2h-2zM8 9v2h2V9H8z"
      fill="#000"
    />
  </svg>
);
