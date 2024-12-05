import React, { useState } from 'react'
import { Box, useDisclosure, useBreakpointValue } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useColorMode } from '../ui/color-mode'
import usePageViews from '../common/usePageViews'
import { isMobile } from '../common/predefined'

const navBarHeight = '70px'
const sideBarWidth = '200px'

function Layout ({ children }) {
  usePageViews()
  const { colorMode, toggleColorMode, colors, fonts } = useColorMode()
  // console.log({ colorMode, colors })

  const [isOpen, setIsOpen] = useState(false)

  const onToggleSidebar = () => {
    setIsOpen(prevState => !prevState)
  }

  // const isMobile = useBreakpointValue({ base: true, md: false })
  // console.log({ isMobile })
  return (
    <Box bg={colors.background}>
      {/* <Sidebar
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={onToggleSidebar}
        colors={colors}
        sideBarWidth={sideBarWidth}
        navBarHeight={navBarHeight}
        fonts={fonts}
        position={isMobile ? 'fixed' : 'relative'}
        top={isMobile ? 0 : 'auto'}
        zIndex={isMobile ? 999 : 'auto'}
        height={isMobile ? '100vh' : 'auto'}
        width={isMobile ? '100%' : sideBarWidth}
      /> */}
      <Box
        position={isMobile ? 'fixed' : 'relative'}
        top={isMobile ? 0 : 'auto'}
        zIndex={isMobile ? 1000 : 'auto'}
        height={isMobile ? '100vh' : 'auto'}
        width={isMobile ? (isOpen ? '100%' : '0') : sideBarWidth}
        transition="opacity 0.3s ease-in-out" //
        overflowX='hidden'
        onClick={isMobile ? onToggleSidebar : undefined}
        bg='rgba(0, 0, 0, 0.3)'
      />
      <Sidebar
        isOpen={isOpen}
        onClose={onToggleSidebar}
        colors={colors}
        sideBarWidth={sideBarWidth}
        navBarHeight={navBarHeight}
        fonts={fonts}
        position={isMobile ? 'fixed' : 'relative'}
        top={isMobile ? 0 : 'auto'}
        zIndex={isMobile ? 999 : 'auto'}
        height={isMobile ? '100vh' : 'auto'}
        width={isMobile ? '100%' : sideBarWidth}
      />
      <Box
        ml={{ base: 0, md: isOpen ? sideBarWidth : '0' }}
        transition='margin 0.3s ease-in-out'
        paddingTop={navBarHeight}
        pt={{ base: '60px', md: navBarHeight }}
        zIndex={0}
      >
        <Navbar
          onToggleSidebar={onToggleSidebar}
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
          colors={colors}
          isSidebarOpen={isMobile ? false : isOpen}
          navBarHeight={navBarHeight}
          sideBarWidth={sideBarWidth}
          fonts={fonts}
        />
        <Box padding='30px 0 30px 0'>{children}</Box>
      </Box>
    </Box>
  )
}

export default Layout
