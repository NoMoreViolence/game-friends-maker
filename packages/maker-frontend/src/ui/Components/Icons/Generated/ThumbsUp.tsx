import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgThumbsUp = (props: SvgIconProps) => (
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
      d="M22 12c0-1.683-1.13-3-3-3h-3.073l.028-.077.182-.482V8.44l.16-.422c.19-.51.329-.922.441-1.329.17-.615.262-1.17.262-1.69 0-1.472-.908-2.386-2.252-2.777-.606-.177-1.133-.223-1.748-.223h-.48l-.3.374c-.339.422-1.005 1.184-1.773 2.061C9.03 6.053 7.267 8.068 6.57 9.082A2 2 0 006 9H4a2 2 0 00-2 2v9a2 2 0 002 2h2c.687 0 1.293-.346 1.653-.874.304.196.642.36 1.01.491a6.74 6.74 0 002.371.381L18 22c2.755 0 4-4.056 4-10zM9.337 19.733C8.452 19.418 8 18.901 8 18V11c0-.241.044-.454.142-.68.174-.409 1.76-2.218 3.263-3.932a154.94 154.94 0 002.055-2.374 3.5 3.5 0 01.73.128c.572.167.81.406.81.857 0 .317-.064.702-.19 1.159-.094.34-.216.701-.387 1.162l-.15.395-.194.515a8.11 8.11 0 00-.274.845c-.25 1 0 1.924 1.195 1.924h4c.691 0 1 .36 1 1 0 4.79-.985 8-2 8h-7.037a4.809 4.809 0 01-1.626-.265zM4 20v-9h2v9H4z"
      fill="#000"
    />
  </svg>
);
