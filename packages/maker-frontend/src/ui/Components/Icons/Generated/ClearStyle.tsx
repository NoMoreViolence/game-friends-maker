import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgClearStyle = (props: SvgIconProps) => (
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
      d="M13 20v-5.586l8.293 8.293 1.414-1.414-20-20-1.414 1.414L3 4.414v1.539l1.576.037L11 12.414V20H9v2h6v-2h-2zM11 6.786l2 2V4h6v1.953L21 6V2H6.214l2 2H11v2.786z"
      fill="#000"
    />
  </svg>
);
