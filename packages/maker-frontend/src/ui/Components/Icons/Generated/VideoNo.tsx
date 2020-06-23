import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgVideoNo = (props: SvgIconProps) => (
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
      d="M1.707.293L.293 1.707 3.586 5H3a2 2 0 00-2 2v10a2 2 0 002 2h12c.702 0 1.32-.362 1.677-.91l5.616 5.617 1.414-1.414-22-22zM15 16.414L5.586 7H3v10h12v-.586zm2-8.032l6-3V18.37l-2-2V8.618l-4 2v2.383l-2-2V7h-4L9 5h6a2 2 0 012 2v1.382z"
      fill="#000"
    />
  </svg>
);
