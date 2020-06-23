import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgTrashEmpty = (props: SvgIconProps) => (
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
      d="M9 1h6a2 2 0 012 2v1h3a2 2 0 012 2v2a2 2 0 01-2 2h-.08L19 21a2 2 0 01-2 2H7c-1.105 0-2-.895-1.997-1.917L4.08 10H4a2 2 0 01-2-2V6a2 2 0 012-2h3V3a2 2 0 012-2zM4 6h16v2H4V6zm2.086 4h11.827l-.91 10.917L17 21H7l-.914-11zM15 3v1H9V3h6zm-1.586 12l2.293 2.293-1.414 1.414L12 16.414l-2.293 2.293-1.414-1.414L10.586 15l-2.293-2.293 1.414-1.414L12 13.586l2.293-2.293 1.414 1.414L13.414 15z"
      fill="#000"
    />
  </svg>
);
