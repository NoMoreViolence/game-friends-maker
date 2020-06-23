import * as React from 'react';
import { SvgIconProps } from '../Interface';
export const SvgPaperclipNo = (props: SvgIconProps) => (
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
      d="M12.87 20.138l2.904-2.95 5.519 5.52 1.414-1.415-20-20-1.414 1.414 5.425 5.425-2.86 2.903a6.506 6.506 0 00-.002 9.103c2.454 2.503 6.6 2.463 9.014 0zm-4.42-5.775l2.232-2.267 1.133 1.133-2.264 2.3a.773.773 0 01-1.101.002.836.836 0 010-1.168zm4.78.28l-2.248 2.283a2.771 2.771 0 01-3.96.004 2.837 2.837 0 01.001-3.969l2.245-2.28-1.136-1.135-2.847 2.89a4.505 4.505 0 000 6.302c1.663 1.697 4.52 1.669 6.158-.002l2.917-2.962-1.13-1.13zm-1.17-6.797l1.415 1.414 1.293-1.313-1.425-1.403-1.283 1.302zm2.547 2.547l1.895-1.926a2.671 2.671 0 000-3.734c-.968-.988-2.681-.966-3.63.002L10.925 6.71 9.511 5.297l1.934-1.964c1.724-1.758 4.725-1.797 6.486 0a4.671 4.671 0 01-.002 6.536l-1.908 1.938-1.414-1.414zm5.685-.644l-3.14 3.189 1.414 1.414 3.151-3.2-1.425-1.403z"
      fill="#000"
    />
  </svg>
);
