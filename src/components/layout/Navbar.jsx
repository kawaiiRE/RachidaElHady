import React from 'react'
import { Flex, Spacer, Box, Text, IconButton } from '@chakra-ui/react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { LuMoon, LuSun } from 'react-icons/lu'
import { ColorModeButton } from '../ui/color-mode'

function Navbar ({
  onToggleSidebar,
  colorMode,
  toggleColorMode,
  colors,
  isSidebarOpen,
  navBarHeight,
  sideBarWidth,
  fonts
}) {
  return (
    <Flex
      // bg='rgba(0, 0, 0, 0.3)' // Transparent background with some opacity
      backdropFilter='blur(10px)' // Apply blur effect
      _webkitBackdropFilter='blur(10px)' // Safari support
      boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)' // Optional: Adds subtle shadow
      position='fixed' // Make the navbar fixed at the top
      top={0}
      // left={0}
      right={0}
      zIndex={1000} // Ensures navbar is on top
      p={4}
      align='center'
      width={isSidebarOpen ? `calc(100% - ${sideBarWidth})` : '100%'}
      transition='width 0.3s ease-in-out'
      height={navBarHeight}
    >
      <IconButton
        aria-label='Menu'
        // icon={<HiMenuAlt3 />}
        variant='ghost'
        onClick={onToggleSidebar}
        // display={{ base: 'block', md: 'block' }}
        size={'lg'}
        rounded='full'
        colorPalette='gray'
        marginRight='20px'
        filter={`drop-shadow(0 0 4px ${colors.background})`}
      >
        <HiMenuAlt3 />
      </IconButton>

      <Box>
        <Text
          fontSize='lg'
          fontWeight='bold'
          textShadow={`0 0 10px ${colors.background}`}
          fontFamily={fonts.main}
        >
          My Professional App
        </Text>
      </Box>
    </Flex>
  )
}

export default Navbar
