import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgHeartNo = (props: SvgIconProps) => (
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
      d="M2.414 1.293L1 2.707l1.439 1.44C1.31 5.414.643 7.155.643 9.12c0 3.047 1.756 5.984 5.023 8.821 1.714 1.488 3.9 2.96 5.466 3.743l.868.434.868-.434c1.23-.615 2.845-1.657 4.312-2.797l3.82 3.82 1.414-1.414-20-20zm13.34 16.168L3.857 5.564c-.764.9-1.214 2.135-1.214 3.556 0 2.37 1.463 4.818 4.335 7.311 1.578 1.37 3.61 2.74 5.022 3.45 1.055-.53 2.455-1.428 3.754-2.42zm5.603-8.341c0 1.849-.89 3.744-2.644 5.672l1.416 1.415c2.11-2.296 3.228-4.656 3.228-7.087 0-3.987-2.834-7.105-6.642-7.12-1.49 0-2.446.17-3.545.69a6.38 6.38 0 00-1.18.722 6.522 6.522 0 00-1.135-.69C9.735 2.187 8.728 2 7.292 2c-.432 0-.852.04-1.256.115l1.902 1.902c.804.047 1.396.195 2.055.51.486.232.915.538 1.285.92l.724.745.717-.752c.379-.396.814-.71 1.306-.942.8-.378 1.473-.498 2.686-.498 2.66.01 4.646 2.196 4.646 5.12z"
      fill="#000"
    />
  </svg>
);
