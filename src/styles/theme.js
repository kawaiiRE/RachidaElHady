const commonTheme = {
  // Border colors
  primary: 'gray.solid',
  secondary: 'gray.fg',
  text: 'fg',
  textSecondary: 'fg.muted',
  textInverted: 'fg.inverted',
  background: 'bg',
  backgroundSecondary: 'bg.muted',
  border: 'gray.fg',
  // danger:,
  // success:,
  // warning:,
  // info:,
}

const theme = {
  light: {
    ...commonTheme,
    textSecondary: 'gray.800',
    gradientColor:'white'

  },
  dark: {
    ...commonTheme,
    textSecondary: 'gray.100',
    gradientColor:'black'
  
  
  }
}
export default theme
