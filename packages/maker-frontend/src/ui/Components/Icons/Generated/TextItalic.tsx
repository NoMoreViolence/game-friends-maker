import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTextItalic = (props: SvgIconProps) => (
  <svg
    width={props.size}
    height={props.size}
    fill="none"
    viewBox="0 0 24 24"
    fillOpacity={typeof props.opacity === 'number' ? props.opacity : 1}
  >
    <path d="M14.802 4l-3.555 16H15v2H5.5v-2h3.698l3.555-16H9.5V2H19v2h-4.198z" fill="#000" />
  </svg>
);
