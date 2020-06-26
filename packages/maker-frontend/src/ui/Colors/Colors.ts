const grayScale = {
  50: '#F5F7FB',
  100: '#F3F6FA',
  200: '#EDF0F6',
  300: '#E2E6F0',
  400: '#D7DCE7',
  500: '#CBD0DC',
  600: '#99A0B0',
  700: '#898F9D',
  800: '#60646C',
  900: '#35373A',
};

const primaryScale = {
  100: '#E2E5FE',
  200: '#C3CBFC',
  300: '#A2B3FA',
  400: '#7D9BF7',
  500: '#4D84F4',
  600: '#4168BE',
  700: '#354E8B',
  800: '#28355B',
  900: '#191D2F',
};

const secondaryScale = {
  100: '#FFDCD9',
  200: '#FFB9B5',
  300: '#FF9691',
  400: '#FE6F6F',
  500: '#F5414F',
  600: '#C03740',
  700: '#8D2D31',
  800: '#5D2222',
  900: '#311615',
};

const white = '#FFFFFF';
const black = '#000000';

const primaryLight = primaryScale[100];
const primary = primaryScale[500];
const primaryDark = primaryScale[900];

const secondaryLight = secondaryScale[100];
const secondary = secondaryScale[500];
const secondaryDark = secondaryScale[900];

const gray = grayScale[500];

const statusColors = {
  infoLight: '#D4D3FC',
  info: secondary,
  successLight: '#BCF0EE',
  success: primary,
  warningLight: '#FDEFCC',
  warning: '#F8CA55',
  errorLight: '#FDD5D4',
  error: '#FF4C4C',
};

export const Colors = {
  primaryScale,
  primaryLight,
  primary,
  primaryDark,
  secondaryScale,
  secondaryLight,
  secondary,
  secondaryDark,
  grayScale,
  gray,
  white,
  black,
  statusColors,
};
