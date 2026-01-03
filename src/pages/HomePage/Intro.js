import React from 'react'
import {
  Box,
  Flex,
  Image,
  Heading,
  Icon,
  Button,
  useBreakpointValue
} from '@chakra-ui/react'
import { FiDownload } from 'react-icons/fi'
import { useColorMode } from '../../components/ui/color-mode'
import { AnimatedButton } from '../../components/common/AnimatedButton'
import { AnimatedText, Text } from '../../components/common/TextComponent'

function Intro () {
  const { colors, fonts } = useColorMode()

  const handleDownloadResume = () => {
    const resumeUrl = '/assets/files/Rachida-CV.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Rachida_El_Hady_Resume.pdf'
    link.click()
  }

  return (
    <Flex
      id='introSection'
      justify='center'
      align='center'
      direction={{ base: 'column', md: 'row' }}
      py={8}
      gap={10}
      w='90%'
      mx='auto' // Centers the entire section
      bg={colors.backgroundSecondary}
      shadow='md'
      borderRadius='lg'
    >
      
      <Text isHidden={true}>
          Rachida El Hady | React Native Developer | Github | Frontend Developer
        </Text>
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
        {/* <Text
          fontSize={fonts.sizes.mainTitle}
          fontWeight='bold'
          mb={4}
          color={colors.primary}
          fontFamily={fonts.main}
        >
          The Place Where Innovation Meets Craft
        </Text>
        <Text
          fontSize={fonts.sizes.text}
          color={colors.textSecondary}
          fontFamily={fonts.main}
        >
          Hi, I'm Rachida El Hady! A passionate developer skilled in React,
          React Native, and JavaScript. I craft responsive websites and mobile
          apps, blending modern tech with thoughtful design for seamless user
          experiences.
        </Text> */}
          {/* Hi, I’m Rachida El Hady, a dedicated developer with a
          knack for turning ideas into reality. With hands-on experience in
          JavaScript, React, and mobile technologies, I bring creativity and
          technical expertise to every project, delivering solutions tailored to
          your goals. */}
        <AnimatedText
          textArray={['The Place Where Innovation Meets Craft']}
          fontSize={fonts.sizes.mainTitle}
          fontWeight='bold'
          mb={4}
          color={colors.primary}
          fontFamily={fonts.main}
          delay={0}
        />
        <AnimatedText
          textArray={[
            "Hi, I'm Rachida El Hady! A passionate developer skilled in React, React Native, and JavaScript. I craft responsive websites and mobile apps, blending modern tech with thoughtful design for seamless user experiences."
          ]}
          fontSize={fonts.sizes.text}
          color={colors.textSecondary}
          fontFamily={fonts.main}
          delay={0.4}
        />
        <AnimatedButton
          onClick={handleDownloadResume}
          // colorScheme='teal'
          // size='lg'
          fontSize={fonts.sizes.text}
          // fontWeight='bold'
          // bg={colors.backgroundInverted}
          // _hover={{
          //   bg: colors.primary,
          //   transform: 'scale(1.05)',
          //   boxShadow: `0 0 15px ${colors.backgroundInverted}`
          // }}
          // _active={{
          //   bg: colors.primary,
          //   transform: 'scale(1)',
          //   boxShadow: 'none'
          // }}
          borderRadius='full'
          px={8}
          py={6}
          // leftIcon={<FiDownload />}
          // transition='all 0.3s ease-in-out'
          // w='fit-content'
        >
          {/* <Text
            as='span'
            display={{ base: 'inline-block', sm: 'inline-block' }}
            fontFamily={fonts.main}
            fontSize={fonts.sizes.text}
          > */}
            Download My Resume
          {/* </Text> */}
          {/* <Icon
            // as={FiDownload}
            display={{ base: 'inline-block', sm: 'none' }} // Show only icon on smaller screens
            boxSize={6}
          >
            <FiDownload />
          </Icon> */}
        </AnimatedButton>
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
        w={{ base: '100%', sm: '100%', md: '400px' }}
        h='500px'
        // bg='red'
        position='relative'
        borderRadius='lg'
      >
        <Box
          w={{ base: '90%', sm: '90%', md: '350px' }}
          h='450px'
          right='0px'
          bottom='0px'
          bg={colors.primary}
          position='absolute'
          borderRadius='lg'
        ></Box>
        <Box
          w={{ base: '90%', sm: '90%', md: '350px' }}
          h='450px'
          right='0px'
          bottom='0px'
          position='absolute'
          borderRadius='lg'
          zIndex={0}
          opacity='0.3'
          bg='transparent'
          backgroundImage={`radial-gradient(${colors.gradientColor} 2px, transparent 0)`}
          backgroundSize='15px 13px'
          clipPath=' polygon(100% 50%, 100% 100%, 100% 100%, 50% 100%)'
        />

        <Box
          w={{ base: '90%', sm: '90%', md: '350px' }}
          h='450px'
          left='0px'
          top='0px'
          bg={colors.introBoxBg}
          position='absolute'
          borderRadius='lg'
        ></Box>

        {/* Overlay */}

        <Box
          position='absolute'
          bottom='25px'
          right='70px'
          w={{ base: '90%', sm: '90%', md: '400px' }}
          //   h='40%'
          bg='rgba(0, 0, 0, 0.4)'
          color='white'
          display='flex'
          alignItems='center'
          justifyContent='center'
          px={10}
          py={7}
        >
          <Text
            fontSize={fonts.sizes.text}
            fontWeight='bold'
            textAlign='center'
          >
            "The best way to predict the future is to invent it." – Alan Kay
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default Intro
