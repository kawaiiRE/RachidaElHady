import "@fontsource/montserrat";

const commonTheme = {
  // Border colors
  primary: 'gray.solid',
  secondary: 'gray.fg',
  text: 'fg',
  textSecondary: 'fg.muted',
  textInverted: 'fg.inverted',
  background: 'bg',
  backgroundSecondary: 'bg.muted',
  border: 'gray.muted'
  // danger:,
  // success:,
  // warning:,
  // info:,
}

const theme = {
  light: {
    ...commonTheme,
    textSecondary: 'gray.800',
    gradientColor: 'white',
    backgroundInverted: '#1a202c',
    background: '#ffffff',
    backgroundSecondary: 'bg.muted'
  },
  dark: {
    ...commonTheme,
    textSecondary: 'gray.100',
    gradientColor: 'black',
    backgroundInverted: '#ffffff',
    background: '#1a202c',
    backgroundSecondary: '#011627'
  },
  fonts: {
    main: "'Montserrat', Italic"
  }
}
export default theme
