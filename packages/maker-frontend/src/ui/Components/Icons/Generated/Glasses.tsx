import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgGlasses = (props: SvgIconProps) => (
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
      d="M1 13a1 1 0 110-2h.416a5.001 5.001 0 018.878-.563A3.469 3.469 0 0112 10c.623 0 1.216.158 1.706.437a5.001 5.001 0 018.878.563H23a1 1 0 110 2 5 5 0 11-9.975-.5H13c0-.203-.395-.5-1-.5s-1 .297-1 .5h-.025A5 5 0 111 13zm5 3a3 3 0 100-6 3 3 0 000 6zm15-3a3 3 0 11-6 0 3 3 0 016 0z"
      fill={props.fillColor}
    />
  </svg>
);
