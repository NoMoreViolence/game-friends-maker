import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBrowserNo = (props: SvgIconProps) => (
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
      d="M12 15.414l-2.293 2.293-1.414-1.414L10.586 14l-2.293-2.293 1.414-1.414L12 12.586l2.293-2.293 1.414 1.414L13.414 14l2.293 2.293-1.414 1.414L12 15.414zM21 9H3v10h18V9zm0-2V5H3v2h18zM3 21a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2H3z"
      fill={props.fillColor}
    />
  </svg>
);
