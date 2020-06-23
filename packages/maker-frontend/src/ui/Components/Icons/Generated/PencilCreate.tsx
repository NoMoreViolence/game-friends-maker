import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgPencilCreate = (props: SvgIconProps) => (
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
      d="M16.437 2c.655 0 1.283.261 1.741.723l3.101 3.101a2.462 2.462 0 010 3.482L9.958 20.624c-.699.806-1.69 1.3-2.823 1.378H2v-1l.003-4.215c.085-1.054.576-2.035 1.323-2.694l11.37-11.368A2.456 2.456 0 0116.436 2zM7.064 20.005c.534-.038 1.031-.287 1.43-.743l7.563-7.562-3.755-3.755-7.606 7.605c-.405.358-.656.86-.696 1.318v3.135l3.064.002zM13.717 6.53l3.754 3.755 2.394-2.394a.462.462 0 000-.653L16.76 4.135a.456.456 0 00-.647 0L13.717 6.53z"
      fill="#000"
    />
  </svg>
);
