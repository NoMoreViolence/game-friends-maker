import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgLightningNo = (props: SvgIconProps) => (
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
      d="M8.216 9.63L1.293 2.707l1.414-1.414 20 20-1.414 1.414-6.766-6.765L9 22.85V15H3.92l4.296-5.37zm4.888 4.889l-3.466-3.466L8.081 13H11v4.15l2.104-2.631zm-2.39-8.012L15 1.149V9h5.08l-3.054 3.819-1.423-1.423.316-.396h-.712L13 8.793V6.85l-.863 1.079-1.423-1.423z"
      fill={props.fillColor}
    />
  </svg>
);
