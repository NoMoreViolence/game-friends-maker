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
  50: '#C7C6FF',
  100: '#B3B1FF',
  200: '#9C9AFC',
  300: '#8381FC',
  400: '#6E6CF4',
  500: '#6361E3',
  600: '#5A57DD',
  700: '#4542C8',
  800: '#3936A9',
  900: '#2D2A8E',
};

const secondaryScale = {
  50: '#C3FCF9',
  100: '#A5F5F2',
  200: '#8FF6F2',
  300: '#70ECE7',
  400: '#30D4D2',
  500: '#1CC9C2',
  600: '#0EB4AD',
  700: '#149892',
  800: '#15706C',
  900: '#114D4A',
};

const white = '#FFFFFF';
const black = '#000000';

const primaryLight = primaryScale['50'];
const primary = primaryScale['500'];
const primaryDark = primaryScale['900'];

const secondaryLight = secondaryScale['50'];
const secondary = secondaryScale['500'];
const secondaryDark = secondaryScale['900'];

const gray = grayScale['500'];

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
