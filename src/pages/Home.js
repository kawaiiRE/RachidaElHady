import React from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import Intro from './Intro'
import ExpertiseSection from './ExpertiseSection'
import ToolsSection from './ToolsSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'

function Home () {
  return (
    <Box textAlign='center' >
      <Intro/>
      <ExpertiseSection/>
      <ToolsSection/>
      <ProjectsSection/>
      <ContactSection/>
      {/* <Heading>Welcome to My Portfolio</Heading>
      <Text mt={4}>Explore my projects and skills!</Text> */}
    </Box>
  )
}

export default Home
