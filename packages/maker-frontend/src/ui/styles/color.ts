import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const primaryScale = {
  light: '#81D4FA',
  default: '#03A9F4',
  dark: '#0277BD',
};

const secondaryScale = {
  light: '#C0CFFF',
  default: '#8C9EFF',
  dark: '#5870CD',
};

const grayScale = {
  light: '#EFEFEF',
  default: '#B7B7B7',
  dark: '#616161', // gray
};

const yellowScale = {
  light: '#FFFF54',
  default: '#FFDC03',
  dark: '#C7AB00',
};

export const Colors = {
  primaryScale,
  primary: primaryScale.default,
  secondaryScale,
  secondary: secondaryScale.default,
  grayScale,
  gray: grayScale.default,
  yellowScale,
  yellow: yellowScale.default,
  white: '#FFFFFF',
  black: '#000000',
  likeBlack: 'rgb(26, 49, 76)',
  likeGray: 'rgb(174, 174, 174)',
  likeWhite: '#fafafa',
  grayBackground: 'rgb(248, 248, 248)',
  transparent: 'transparent',
  'modal-dim': 'rgba(0, 0, 0, 0.5)',
  error: '#FF290D',
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
