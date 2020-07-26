import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgLightning = (props: SvgIconProps) => (
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
      d="M3.92 15H9v7.85L20.08 9H15V1.15L3.92 15zM11 13H8.08L13 6.85V11h2.92L11 17.15V13z"
      fill={props.fillColor}
    />
  </svg>
);
