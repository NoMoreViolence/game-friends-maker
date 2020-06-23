import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgBarChart = (props: SvgIconProps) => (
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
      d="M3 3h18a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h18V5H3zm4 12h2v-6H7v6zm6 0h-2V7h2v10zm2 0h2v-7h-2v7z"
      fill="#000"
    />
  </svg>
);
