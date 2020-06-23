import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgSticker = (props: SvgIconProps) => (
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
      d="M12 23C5.925 23 1 18.075 1 12S5.925 1 12 1h.414L23 11.586V12c0 6.075-4.925 11-11 11zM3 12a9 9 0 0017.792 1.935A8.778 8.778 0 0110.066 3.209C6.024 4.093 3 7.693 3 12zm9.066-8.52a6.778 6.778 0 008.453 8.453l-8.453-8.452z"
      fill="#000"
    />
  </svg>
);
