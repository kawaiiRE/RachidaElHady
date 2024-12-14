import React from 'react'
import { Flex, Spacer, Box, IconButton } from '@chakra-ui/react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { LuMoon, LuSun } from 'react-icons/lu'
import { ColorModeButton } from '../ui/color-mode'
import { Text } from '../common/TextComponent'

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
      // bg='rgba(0, 0, 0, 0.3)'
      backdropFilter='blur(10px)' 
      _webkitBackdropFilter='blur(10px)'
      boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
      position='fixed'
      top={0}
      // left={0}
      right={0}
      zIndex={999}
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
        >
          Rachida El Hady
        </Text>
      </Box>
    </Flex>
  )
}

export default Navbar
