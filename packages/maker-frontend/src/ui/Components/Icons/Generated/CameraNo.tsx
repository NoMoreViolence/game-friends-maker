import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgCameraNo = (props: SvgIconProps) => (
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
      d="M2.707 1.293L1.293 2.707 4.586 6H4a3 3 0 00-3 3v9a3 3 0 003 3h15.586l1.707 1.707 1.414-1.414-20-20zM17.586 19l-2.263-2.263a5 5 0 01-7.06-7.06L6.586 8H4a1 1 0 00-1 1v9a1 1 0 001 1h13.586zM9.68 11.096a3 3 0 004.223 4.223l-4.223-4.223zM20 6a3 3 0 013 3v9h-2V9a1 1 0 00-1-1h-3c-.664 0-1.112-.364-1.56-.987a8.42 8.42 0 01-.329-.499 79.974 79.974 0 01-.226-.372l-.073-.12C14.36 5.282 14.087 5 14 5h-4c.03 0 .02.01-.047.072l-.07.066c-.07.066-.373.377-.356.36A139.28 139.28 0 018.097 4.1c-.032.032.305-.314.405-.409C8.968 3.247 9.407 3 10 3h4c1.087 0 1.69.622 2.518 1.978l.084.139.002.002.21.345c.1.162.178.283.249.381.047.065.088.117.12.155H20zm-1 5a1 1 0 100-2 1 1 0 000 2z"
      fill="#000"
    />
  </svg>
);
