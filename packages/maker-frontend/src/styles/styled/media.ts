export const size = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  tabletL: 992,
  laptop: 1024,
  laptopL: 1440,
  desktop: 1920,
};

export const device = {
  mobileToTablet: `(min-width: ${size.mobileS}px) and (max-width: ${size.tablet - 1}px)`,
  mobileToLaptop: `(min-width: ${size.mobileS}px) and (max-width: ${size.laptop - 1}px)`,
  mobileToLaptopL: `(min-width: ${size.mobileS}px) and (max-width: ${size.laptopL - 1}px)`,
  mobileToDesktop: `(min-width: ${size.mobileS}px) and (max-width: ${size.desktop - 1}px)`,
  mobileAll: `(min-width: ${size.mobileS}px)`,

  tabletToLaptop: `(min-width: ${size.tablet}px) and (max-width: ${size.laptop - 1}px)`,
  tabletToLaptopL: `(min-width: ${size.tablet}px) and (max-width: ${size.laptopL - 1}px)`,
  tabletToDesktop: `(min-width: ${size.tablet}px) and (max-width: ${size.desktop - 1}px)`,
  tabletAll: `(min-width: ${size.tablet}px)`,

  laptopToLaptopL: `(min-width: ${size.laptop}px) and (max-width: ${size.laptopL - 1}px)`,
  laptopLToDesktop: `(min-width: ${size.laptopL}px) and (max-width: ${size.desktop - 1}px)`,
  desktopAll: `(min-width: ${size.desktop}px)`,
};