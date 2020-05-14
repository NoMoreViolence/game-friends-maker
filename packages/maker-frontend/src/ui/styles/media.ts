const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const media = {
  mobile: `@media screen and (min-width: ${size.mobileS}px) and (max-width: ${size.tablet - 1}px)`,
  tablet: `@media screen and (min-width: ${size.tablet}px) and (max-width: ${size.laptop - 1}px)`,
  desktop: `@media screen and (min-width: ${size.laptop}px) and (max-width: ${size.laptopL - 1}px)`,
  desktopL: `@media screen and (min-width: ${size.laptopL}px)`,
};
