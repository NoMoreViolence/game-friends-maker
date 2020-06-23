import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBookmarks = (props: SvgIconProps) => (
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
      d="M10 1c-1.093 0-1.982.892-2 2h11v14.916l2 1.016V3.034C21 1.91 20.105 1 19 1h-9zm0 18.118l-7 3.5V7a2 2 0 012-2h10a2 2 0 012 2v15.618l-7-3.5zm-5 .264l5-2.5 5 2.5V7H5v12.382z"
      fill="#000"
    />
  </svg>
);
