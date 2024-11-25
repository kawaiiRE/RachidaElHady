import React from 'react'
import { Box, VStack, Link, Button, Flex } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ColorModeButton } from '../ui/color-mode'

function Sidebar ({
  isOpen = false,
  onClose,
  colors,
  navBarHeight,
  sideBarWidth
}) {
  return (
    <Box
      bg={colors.primary}
      p={4}
      // display={isOpen ? 'block' : 'none'}
      width={{ base: '100%', md: sideBarWidth }}
      height='100vh'
      position='fixed'
      top={0}
      left={0}
      zIndex={999}
      transition='all 0.3s ease-in-out'
      transform={isOpen ? 'translateX(0)' : 'translateX(-100%)'}
      // paddingTop='70px'
      paddingTop='0px'
      borderRight='1px solid'
      // borderColor={colors.border}
    >
      <Flex
        height={navBarHeight} // Full height of the Box
        justify='center' // Horizontally center the content
        align='center' // Vertically center the content
      >
        <ColorModeButton />
      </Flex>
      <VStack align='start' spacing={4}>
        <Link
          as={RouterLink}
          to='/home'
          fontWeight='bold'
          _hover={{ textDecoration: 'underline' }}
        >
          Profile
        </Link>
      </VStack>
    </Box>
  )
}

export default Sidebar
