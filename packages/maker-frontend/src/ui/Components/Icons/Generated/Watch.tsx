import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgWatch = (props: SvgIconProps) => (
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
      d="M15 1H9a1 1 0 00-.962.725l-1.185 4.15A7.983 7.983 0 004 12a7.983 7.983 0 002.853 6.124l1.185 4.15A1 1 0 009 23h6a1 1 0 00.961-.725l1.186-4.15A7.987 7.987 0 0019.938 13H21v-2h-1.062a7.987 7.987 0 00-2.79-5.124l-1.187-4.15A1 1 0 0015 1zm-3 3c.933 0 1.828.16 2.66.453L14.247 3H9.754L9.34 4.453A7.987 7.987 0 0112 4zM9.754 21l-.415-1.453A7.987 7.987 0 0012 20c.933 0 1.828-.16 2.66-.453L14.247 21H9.754zM18 12a6 6 0 11-12 0 6 6 0 0112 0zm-5-1h2v2h-4V8h2v3z"
      fill="#000"
    />
  </svg>
);
