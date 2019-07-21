import React from 'react';
interface Props {
  width?: string;
  height?: string;
}

const MainLogoSvg = ({ width = 'unset', height = 'unset' }: Props) => (
  <svg width={width} height={height} className="svg-logo" id="Layer_1" data-name="Layer 1" viewBox="0 0 174.31 174.31">
    <defs>
      <filter
        id="luminosity-noclip"
        x="0"
        y="0"
        width="190.75"
        height="190.75"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodColor="#fff" result="bg" />
        <feBlend in="SourceGraphic" in2="bg" />
      </filter>
      <mask id="mask" x="-8.22" y="-8.22" width="190.75" height="190.75" maskUnits="userSpaceOnUse">
        <g className="cls-4">
          <g transform="translate(-8.22 -8.22)">
            <path
              className="cls-1"
              d="M0,0V190.75H190.75V0ZM126.69,131.74V90.33L99,118.06a5.13,5.13,0,0,1-7.26,0L64.06,90.33v41.41a5.13,5.13,0,0,1-10.25,0V77.93a5.13,5.13,0,0,1,8.76-3.62l32.81,32.87,32.81-32.87a5.13,5.13,0,0,1,8.75,3.62v53.81a5.13,5.13,0,0,1-10.25,0Zm55.84,45.66a5.13,5.13,0,0,1-5.13,5.13H135.81a5.13,5.13,0,0,1,0-10.25h36.46V18.47H133.94L99,53.47a5.13,5.13,0,0,1-7.26,0l-34.94-35H18.47v153.8H54.93a5.13,5.13,0,1,1,0,10.25H13.34a5.13,5.13,0,0,1-5.13-5.13V13.34a5.13,5.13,0,0,1,5.13-5.13H58.93a5.13,5.13,0,0,1,3.63,1.5L95.37,42.59,128.19,9.72a5.13,5.13,0,0,1,3.63-1.5H177.4a5.13,5.13,0,0,1,5.13,5.13Z"
            />
          </g>
        </g>
      </mask>
    </defs>
    <title>Loading</title>
    <g className="cls-2">
      <polygon
        className="cls-3 stroke"
        points="87.16 41.63 50.72 5.13 5.13 5.13 5.13 169.19 50.72 169.19 50.72 69.72 87.16 106.22 123.6 69.72 123.6 169.19 169.19 169.19 169.19 5.13 123.6 5.13 87.16 41.63"
      />
    </g>
  </svg>
);

export default MainLogoSvg;
