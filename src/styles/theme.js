
const commonTheme={
    
    // Border colors
    border: 'gray.fg',
}

const theme = {
  light: {
    ...commonTheme,
    // Primary colors
    primary: 'blue.500', // Blue color for primary elements (buttons, highlights)
    primaryLight: 'blue.100', // Light blue color for lighter elements
    primaryDark: 'blue.700', // Dark blue for hover states

    // Secondary colors
    secondary: 'green.500', // Green color for secondary elements (buttons, highlights)
    secondaryLight: 'green.100', // Light green color for lighter elements
    secondaryDark: 'green.700', // Dark green for hover states

    // Text colors
    text: 'gray.800', // Dark gray for main text color
    textLight: 'gray.600', // Lighter gray for secondary text
    textDark: 'gray.900', // Darker gray for strong text emphasis

    // Background colors
    background: 'white', // White background for the light mode
    backgroundLight: 'gray.50', // Light gray background for subtle areas
    backgroundDark: 'gray.100', // Slightly darker gray for alternate sections

    // Border colors
    // border: 'gray.fg', // Light gray borders for card and containers
    borderDark: 'gray.400', // Darker gray for hover border effect

    // Miscellaneous colors
    danger: 'red.500', // Red color for danger or error messages
    success: 'green.500', // Green color for success messages
    warning: 'yellow.500', // Yellow color for warnings
    info: 'blue.400' // Light blue for informational messages
  },
  dark: {
    ...commonTheme,
    // Primary colors
    primary: 'blue.300', // Light blue color for primary elements in dark mode
    primaryLight: 'blue.200', // Lighter blue for subtle elements in dark mode
    primaryDark: 'blue.600', // Dark blue for hover states in dark mode

    // Secondary colors
    secondary: 'green.300', // Light green color for secondary elements in dark mode
    secondaryLight: 'green.200', // Lighter green for lighter elements
    secondaryDark: 'green.500', // Darker green for hover states

    // Text colors
    text: 'whiteAlpha.900', // Light text color for dark background
    textLight: 'gray.400', // Lighter gray for secondary text in dark mode
    textDark: 'whiteAlpha.800', // Slightly darker text color for emphasis

    // Background colors
    background: 'gray.800', // Dark background for dark mode
    backgroundLight: 'gray.900', // Darker gray background for areas in dark mode
    backgroundDark: 'gray.700', // Slightly lighter gray for alternate sections

    // Border colors
    // border: 'gray.fg', // Medium gray borders for dark mode elements
    borderDark: 'gray.500', // Darker gray for hover borders

    // Miscellaneous colors
    danger: 'red.400', // Lighter red for danger/error messages in dark mode
    success: 'green.400', // Lighter green for success messages
    warning: 'yellow.400', // Lighter yellow for warnings
    info: 'blue.500' // Darker blue for informational messages in dark mode
  }
}
export default theme
