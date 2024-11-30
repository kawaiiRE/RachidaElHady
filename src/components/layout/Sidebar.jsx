import React from 'react'
import { Box, VStack, Link, Flex, HStack } from '@chakra-ui/react'
import { ColorModeButton } from '../ui/color-mode'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const projects = [
  { name: 'Crazy Sudoku', path: '/projects/crazySudoku' },
  { name: 'Local Business Website', path: '/projects/local-business' }
  // Add more projects as needed
]

function Sidebar ({
  isOpen = false,
  onClose,
  colors,
  navBarHeight,
  sideBarWidth
}) {
  const navigate = useNavigate()

  const handleScrollToSection = sectionId => {
    const section = document.getElementById(sectionId)
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

  const handleOpenNewTab = link => {
    const newTab = window.open(link, '_blank')
    if (newTab) {
      newTab.focus()
    }
  }

  const linkStyles = {
    fontWeight: 'bold',
    fontSize: 'lg', // Make text slightly bigger
    color: colors.textInverted,
    p: 2, // Add padding for spacing
    borderRadius: 'md',
    _hover: {
      bg: colors.background, // Change background color on hover
      color: colors.text, // Optional: change text color on hover
      textDecoration: 'none' // Remove underline on hover
    },
    zIndex: 10,
    width: '100%'
  }

  return (
    <Box
      bg={colors.backgroundInverted}
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
      <VStack align='start' spacing={0} mt={8} zIndex={10} gap={0}>
        <Link
          onClick={() => handleScrollToSection('introSection')}
          {...linkStyles}
        >
          Intro
        </Link>
        <Link
          onClick={() => handleScrollToSection('expertiseSection')}
          {...linkStyles}
        >
          Expertise
        </Link>
        <Link
          onClick={() => handleScrollToSection('toolsSection')}
          {...linkStyles}
        >
          Tools
        </Link>
        <Link
          onClick={() => handleScrollToSection('projectsSection')}
          {...linkStyles}
        >
          Projects
        </Link>
        <Box>
          <VStack align='start' pl={4} spacing={2}>
            {projects.map(project => (
              <Link
                key={project.name}
                onClick={() => navigate(project.path)}
                {...linkStyles}
                fontSize='md' // Slightly smaller for sub-links
                fontWeight='normal'
              >
                {project.name}
              </Link>
            ))}
          </VStack>
        </Box>
        <Link
          onClick={() => handleScrollToSection('contactSection')}
          {...linkStyles}
        >
          Contact
        </Link>
      </VStack>
      {/* Social Media Links */}
      <Flex
        position='absolute'
        bottom='16px'
        left='0'
        right='0'
        justifyContent='center'
        alignItems='center'
        zIndex={10}
      >
        <HStack spacing={8}
        justifyContent='space-evenly' w='90%'>
          <Box
            as={FaLinkedin}
            size='24px'
            color='#0A66C2' // LinkedIn blue
            _hover={{ transform: 'scale(1.2)' }} // Slightly enlarge on hover
            transition='transform 0.2s ease'
            onClick={() =>
              handleOpenNewTab(
                'https://www.linkedin.com/in/rachida-el-hady-8a5251223/'
              )
            }
            cursor='pointer'
          />
          <Box
            as={FaGithub}
            size='24px'
            color='black' // GitHub black
            _hover={{ transform: 'scale(1.2)' }} // Slightly enlarge on hover
            transition='transform 0.2s ease'
            onClick={() => handleOpenNewTab('https://github.com/your-profile')}
            cursor='pointer'
          />
          <Box
            as={FaWhatsapp}
            size='24px'
            color='#25D366' // WhatsApp green
            _hover={{ transform: 'scale(1.2)' }} // Slightly enlarge on hover
            transition='transform 0.2s ease'
            onClick={() => handleOpenNewTab('https://wa.me/your-number')}
            cursor='pointer'
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Sidebar
