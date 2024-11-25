import React from 'react'
import { Box, Flex, Text, Image, Heading } from '@chakra-ui/react'

function Intro () {
  return (
    <Flex
      justify='center'
      align='center'
      direction={{ base: 'column', md: 'row' }}
      py={8}
      gap={10}
      w='90%'
      mx='auto' // Centers the entire section
      bg='gray.100'
      shadow='md'
      borderRadius='lg'
    >
      {/* First Box with two texts */}
      <Box
        textAlign='left'
        p={5}
        borderRadius='lg'
        w={{ base: '100%', md: '60%' }}
        h='100%'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        gap={6}
      >
        <Text fontSize='7xl' fontWeight='bold' mb={4} color='teal.500'>
          The Place Where Innovation Meets Craft
        </Text>
        <Text fontSize='xl' color='gray.600'>
          Hi, I'm Rachida El Hady! A passionate developer skilled in React,
          React Native, and JavaScript. I craft responsive websites and mobile
          apps, blending modern tech with thoughtful design for seamless user
          experiences.
        </Text>
      </Box>

      {/* Second Box with an image and text over it */}
      {/* <Image 
          src='https://via.placeholder.com/400x300' 
          alt='Portfolio Showcase' 
          w='100%' 
          h='100%' 
          objectFit='cover'
        /> */}
      <Box
        w='400px'
        h='500px'
        // bg='red'
        position='relative'
        borderRadius='lg'
      >
      <Box
        w='350px'
        h='450px'
        right='0px'
        bottom='0px'
        bg='green'
        position='absolute'
        borderRadius='lg'
      ></Box>
      <Box
        w='350px'
        h='450px'
        left='0px'
        top='0px'
        bg='blue'
        position='absolute'
        borderRadius='lg'
      ></Box>
        {/* Overlay */}

        <Box
          position='absolute'
          bottom='25px'
          right='70px'
          w='500px'
        //   h='40%'
          bg='rgba(0, 0, 0, 0.4)'
          color='white'
          display='flex'
          alignItems='center'
          justifyContent='center'
          px={10}
          py={7}
        >
          <Text fontSize='lg' fontWeight='bold' textAlign='center'>
            "The best way to predict the future is to invent it." – Alan Kay
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default Intro
