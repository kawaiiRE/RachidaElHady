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
      bg={colors.secondary}
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
    <Box
      position='absolute'
      bottom='0'
      right='0'
      width='100%'
      height='100%'
      zIndex={0}
      opacity='0.3'
      bg='transparent'
        backgroundImage={`radial-gradient(${colors.gradientColor} 2px, transparent 0)`}
      backgroundSize='15px 13px'
      // transform={`translateX(${scrollProgress * 400}px)
      //      translateY(${scrollProgress * 500}px)
      //  rotate(45deg)`}
      transition='transform 0.2s ease'
      clipPath=' polygon(0 0, 100% 50%, 0 100%, 0 50%)'
    />

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
          color={colors.textInverted}
        >
          Profile
        </Link>
      </VStack>
    </Box>
  )
}

export default Sidebar
