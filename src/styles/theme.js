const commonTheme = {
  // Border colors
  primary: 'purple.fg',
  secondary: 'purple.focusRing',
  text: 'fg',
  textSecondary: 'fg.muted',
  textInverted: 'fg.inverted',
  background: 'purple.subtle',
  backgroundSecondary: 'purple.muted',
  border: 'gray.fg',
  // danger:,
  // success:,
  // warning:,
  // info:,
}

const theme = {
  light: {
    ...commonTheme,

    primary: 'purple.800',
    secondary: 'purple.700',
    // text: 'fg',
    textSecondary: 'gray.800',
    // textInverted: 'fg.inverted',
    // background: 'purple.subtle',
    // backgroundSecondary: 'purple.muted',
    // border: 'gray.fg',
  },
  dark: {
    ...commonTheme,
  
  
  }
}
export default theme
