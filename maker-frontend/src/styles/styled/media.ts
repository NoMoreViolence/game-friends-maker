export const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  tabletL: 992,
  laptop: 1024,
  laptopL: 1440,
  desktop: 2560,
};

export const device = {
  mobile: `(min-width: ${size.mobileS}px) and (max-width: ${size.tablet - 1}px)`,
  mobileToTablet: `(min-width: ${size.mobileS}px) and (max-width: ${size.tablet - 1}px)`,
  tablet: `(min-width: ${size.tablet}px) and (max-width: ${size.laptop - 1}px)`,
  mobileToDesktop: `(min-width: ${size.mobileS}px) and (max-width: ${size.laptop - 1}px)`,
  desktop: `(min-width: ${size.laptop}px)`,
};
