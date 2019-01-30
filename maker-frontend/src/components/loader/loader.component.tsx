import * as React from 'react';
import './loader.component.scss';

interface Props {
  loginStatus: 'none' | 'pending' | 'success';
  registerStatus: 'none' | 'pending' | 'success';
}

// Thank you for https://codepen.io/akwright/ Alex
const LoaderComponent: React.SFC<Props> = props => (
  <>
    {(props.loginStatus === 'pending' || props.registerStatus === 'pending') && (
      <div className="modal transparent-black-background">
        <div className="modal-card loading-container">
          <svg version="1.1" id="preloader6" width="140px" height="140px" viewBox="0 0 200 200">
            <g className="pre load6">
              <path
                fill="#1B1A1C"
                d="M124.5,57L124.5,57c0,3.9-3.1,7-7,7h-36c-3.9,0-7-3.1-7-7v0c0-3.9,3.1-7,7-7h36
	C121.4,50,124.5,53.1,124.5,57z"
              />
              <path
                fill="#1B1A1C"
                d="M147.7,86.9L147.7,86.9c-2.7,2.7-7.2,2.7-9.9,0l-25.5-25.5c-2.7-2.7-2.7-7.2,0-9.9l0,0
	c2.7-2.7,7.2-2.7,9.9,0L147.7,77C150.5,79.8,150.5,84.2,147.7,86.9z"
              />
              <path
                fill="#1B1A1C"
                d="M143,74.5L143,74.5c3.9,0,7,3.1,7,7v36c0,3.9-3.1,7-7,7l0,0c-3.9,0-7-3.1-7-7v-36
	C136,77.6,139.1,74.5,143,74.5z"
              />
              <path
                fill="#1B1A1C"
                d="M148.4,112.4L148.4,112.4c2.7,2.7,2.7,7.2,0,9.9L123,147.7c-2.7,2.7-7.2,2.7-9.9,0h0c-2.7-2.7-2.7-7.2,0-9.9
	l25.5-25.5C141.3,109.6,145.7,109.6,148.4,112.4z"
              />
              <path
                fill="#1B1A1C"
                d="M125.5,143L125.5,143c0,3.9-3.1,7-7,7h-36c-3.9,0-7-3.1-7-7l0,0c0-3.9,3.1-7,7-7h36 C122.4,136,125.5,139.1,125.5,143z"
              />
              <path
                fill="#1B1A1C"
                d="M52.3,113.1L52.3,113.1c2.7-2.7,7.2-2.7,9.9,0l25.5,25.5c2.7,2.7,2.7,7.2,0,9.9h0c-2.7,2.7-7.2,2.7-9.9,0
	L52.3,123C49.5,120.2,49.5,115.8,52.3,113.1z"
              />
              <path
                fill="#1B1A1C"
                d="M57,75.5L57,75.5c3.9,0,7,3.1,7,7v36c0,3.9-3.1,7-7,7h0c-3.9,0-7-3.1-7-7v-36C50,78.6,53.1,75.5,57,75.5z"
              />
              <path
                fill="#1B1A1C"
                d="M86.9,52.3L86.9,52.3c2.7,2.7,2.7,7.2,0,9.9L61.5,87.6c-2.7,2.7-7.2,2.7-9.9,0l0,0c-2.7-2.7-2.7-7.2,0-9.9
	L77,52.3C79.8,49.5,84.2,49.5,86.9,52.3z"
              />
            </g>
          </svg>
        </div>
      </div>
    )}
  </>
);

export default LoaderComponent;
