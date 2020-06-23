import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCameraCreate = (props: SvgIconProps) => (
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
      d="M6.937 5.845c.07-.098.15-.219.25-.381l.211-.347.084-.139C8.31 3.622 8.913 3 10 3h5v2h-5c-.087 0-.36.282-.812 1.022l-.073.12-.226.372c-.123.2-.225.356-.328.5C8.112 7.635 7.664 8 7 8H4a1 1 0 00-1 1v9a1 1 0 001 1h16a1 1 0 001-1v-6h2v6a3 3 0 01-3 3H4a3 3 0 01-3-3V9a3 3 0 013-3h2.816c.033-.038.074-.09.121-.155zM17 8V6h2V4h2v2h2v2h-2v2h-2V8h-2zm-5 10a5 5 0 110-10 5 5 0 010 10zm0-2a3 3 0 100-6 3 3 0 000 6z"
      fill="#000"
    />
  </svg>
);
