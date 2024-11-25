import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import Intro from './Intro'

function Home () {
  return (
    <Box textAlign='center' >
      <Intro/>
      {/* <Heading>Welcome to My Portfolio</Heading>
      <Text mt={4}>Explore my projects and skills!</Text> */}
    </Box>
  )
}

export default Home
