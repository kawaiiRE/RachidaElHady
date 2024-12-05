import React,{ useEffect }  from 'react'
import { Box, Heading, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import Intro from './Intro'
import ExpertiseSection from './ExpertiseSection'
import ToolsSection from './ToolsSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'

function Home () {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.sectionId) {
      const section = document.getElementById(location.state.sectionId)
      if (section) {
        const yOffset = -50 // Adjust the offset as needed
        const yPosition =
          section.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({
          top: yPosition,
          behavior: 'smooth'
        })
      }
    }
  }, [location.state])
  return (
    <Box textAlign='center' >
      <Intro />
      <ExpertiseSection />
      <ToolsSection />
      <ProjectsSection />
      <ContactSection />
    </Box>
  )
}

export default Home
