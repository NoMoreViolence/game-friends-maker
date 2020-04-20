import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const primaryScale = {
  light: '#81d4fa',
  default: '#03a9f4',
  dark: '#0277bd',
};

const secondaryScale = {
  light: '#C0CFFF',
  default: '#8C9EFF',
  dark: '#5870CD',
};

const grayScale = {
  light: '#efefef',
  default: '#b7b7b7',
  dark: '#616161', // gray
};

export const Colors = {
  primaryScale,
  primary: primaryScale['default'],
  secondaryScale,
  secondary: secondaryScale['default'],
  grayScale,
  gray: grayScale['default'],
  white: '#FFFFFF',
  black: '#000000',
};

export const ColorsTheme = createMuiTheme({
  palette: {
    primary: {
      light: Colors.primaryScale.light,
      main: Colors.primary,
      dark: Colors.primaryScale.dark,
    },
    secondary: {
      light: Colors.secondaryScale.light,
      main: Colors.secondary,
      dark: Colors.secondaryScale.dark,
    },
  },
});
