import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgShare = (props: SvgIconProps) => (
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
      d="M14 6c0 .287.03.568.088.838L9.017 9.373a4 4 0 100 5.253l5.07 2.536a4 4 0 10.895-1.788l-5.07-2.536a4.016 4.016 0 000-1.676l5.071-2.536A4 4 0 1014 6zm-6 6a2 2 0 11-4 0 2 2 0 014 0zm10-4a2 2 0 100-4 2 2 0 000 4zm2 10a2 2 0 11-4 0 2 2 0 014 0z"
      fill="#000"
    />
  </svg>
);
