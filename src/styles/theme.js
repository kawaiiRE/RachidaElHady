import '@fontsource/montserrat'

const commonTheme = {
  // Border colors
  primary: 'gray.solid',
  secondary: 'gray.fg',
  text: 'fg',
  textSecondary: 'fg.muted',
  textInverted: 'fg.inverted',
  background: 'bg',
  backgroundSecondary: 'bg.muted',
  border: 'gray.muted',
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
    backgroundSecondary: 'bg.muted',
    backgroundTransparentTBehindText: '#1a202ca8',
  },
  dark: {
    ...commonTheme,
    textSecondary: 'gray.100',
    gradientColor: 'black',
    backgroundInverted: '#ffffff',
    background: '#1a202c',
    backgroundSecondary: '#011627',
    backgroundTransparentTBehindText: '#ffffff87',
  },
  fonts: {
    main: "'Montserrat', Italic",
    sizes: {
      heroTitle: {
        base: '5xl',
        sm: '6xl',
        md: '7xl',
      },
      mainTitle: {
        base: '3xl',
        sm: '4xl',
        md: '6xl',
      },
      title: {
        base: '3xl',
        sm: '4xl',
        md: '5xl',
      },
      titleSec: {
        base: '2xl',
        sm: '3xl',
        md: '4xl',
      },
      subTitle: {
        base: 'lg',
        sm: 'xl',
        md: '2xl',
      },
      text: { base: 'md', sm: 'lg', md: 'xl' },
      subText: { base: 'sm', sm: 'sm', md: 'md' },
      toolsText: { base: 'sm', sm: 'md', md: 'lg' },
      toolsSize: { base: '90px', sm: '120px', md: '150px' },
      toolsImg: { base: '35px', sm: '45px', md: '55px' },
    },
  },
}
export default theme
