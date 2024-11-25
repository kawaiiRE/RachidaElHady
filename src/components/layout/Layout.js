import React, { useState } from 'react'
import { Box, useDisclosure, useBreakpointValue } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useColorMode } from '../ui/color-mode'

const navBarHeight = '70px'
const sideBarWidth = '200px'

function Layout ({ children }) {
  const { colorMode, toggleColorMode, colors } = useColorMode()
  console.log({ colorMode, colors })

  const [isOpen, setIsOpen] = useState(false)

  const onToggleSidebar = () => {
    setIsOpen(prevState => !prevState)
  }

  const isMobile = useBreakpointValue({ base: true, md: false })
  console.log({ isMobile })
  return (
    <Box>
      <Sidebar
        isOpen={isOpen}
        onClose={onToggleSidebar}
        colors={colors}
        sideBarWidth={sideBarWidth}
        navBarHeight={navBarHeight}
      />
      <Box
        ml={{ base: 0, md: isOpen ? sideBarWidth : '0' }}
        transition='margin 0.3s ease-in-out'
        paddingTop={navBarHeight}
      >
        <Navbar
          onToggleSidebar={onToggleSidebar}
          colorMode={colorMode}
          toggleColorMode={toggleColorMode}
          colors={colors}
          isSidebarOpen={isOpen}
          navBarHeight={navBarHeight}
          sideBarWidth={sideBarWidth}
        />
        <Box p={4}>{children}</Box>
      </Box>
    </Box>
  )
}

export default Layout
