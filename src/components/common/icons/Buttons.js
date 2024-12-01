import { Box, IconButton } from '@chakra-ui/react'
import { HiOutlineMail } from 'react-icons/hi'
import { useColorMode } from '../../ui/color-mode'
import { MdEmail } from 'react-icons/md'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa'

// Function to detect platform
const isMobile = () =>
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent
  )

  const handleOpenNewTab = (link) => {
    const newTab = window.open(link, '_blank')
    if (newTab) {
      newTab.focus()
    }

  }

export function EmailButton ({ email = 'elhadyrachida71@gmail.com', withBg = true }) {
  const { colors, fonts } = useColorMode()
  const handleClick = () => {
    const mailtoLink = `mailto:${email}`
    if (isMobile()) {
      // Open the mail app directly
      window.location.href = mailtoLink
    } else {
      // Open a new tab for web-based email clients
      const newTab = window.open(mailtoLink, '_blank')
      if (newTab) newTab.focus()
    }
  }

  return (
    <Box
      as={MdEmail}
      size='md'
      onClick={handleClick}
      {...(withBg
        ? {
            width:'35px',
            height:'35px',
            padding: '7px',
            _hover: {
              transform: 'scale(1.1)',
              backgroundColor: 'white',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease, transform 0.2s ease' // Smooth transition for background and transform
            }
          }
        : {
            transition: 'transform 0.2s ease',
            cursor: 'pointer',
            _hover: {
              transform: 'scale(1.2)'
            },
            width:'24px',
            height:'24px',
          })}
      color='#D93025'
      />
  )
}


export function GithubButton () {
  const { colors, fonts } = useColorMode()
  return (
    <Box
      as={FaGithub}
      size='24px'
      // color='black' // GitHub black
      color={colors.textInverted}
      _hover={{ transform: 'scale(1.2)' }} // Slightly enlarge on hover
      transition='transform 0.2s ease'
      onClick={() => handleOpenNewTab('https://github.com/kawaiiRE')}
      cursor='pointer'
    />
  )
}
export function LinkedinButton () {
  return (
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
  )
}