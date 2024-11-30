import React from 'react'
import { Box, Flex, Text, Icon, Heading } from '@chakra-ui/react'
import { FaReact, FaNodeJs, FaGithub, FaSass, FaDatabase } from 'react-icons/fa'
import { useColorMode } from '../components/ui/color-mode'

function ToolsSection () {
  const { colors, fonts } = useColorMode()
  return (
    <Box py={8} w='90%' mx='auto' id='toolsSection'>
      {/* Main Title */}
      <Box textAlign='center' mb={10}>
        <Heading
          fontSize='5xl'
          fontWeight='bold'
          color={colors.primary}
          fontFamily={fonts.main}
        >
          Tools of My Trade
        </Heading>
        <Text
          fontSize='xl'
          color={colors.textSecondary}
          mt={4}
          fontFamily={fonts.main}
        >
          The technologies and tools I use to build modern, efficient, and
          scalable applications.
        </Text>
      </Box>

      {/* Technologies Grid */}
      <Flex direction='row' wrap='wrap' justify='center' align='center' gap={8}>
        {/* Frontend Technologies */}
        <Box w='100%' textAlign='center'>
          <Heading
            fontSize='3xl'
            color={colors.secondary}
            mb={6}
            fontFamily={fonts.main}
          >
            Frontend Technologies I Prefer To Use
          </Heading>
        </Box>
        <Flex gap={8} wrap='wrap' justify='center'>
          <Technology
            imgSrc='https://www.svgrepo.com/show/355190/reactjs.svg'
            label='React.js / React Native'
          />
          <Technology
            imgSrc='https://www.svgrepo.com/show/355081/js.svg'
            label='JavaScript'
          />
          <Technology
            imgSrc='https://www.svgrepo.com/show/349540/typescript.svg '
            label='TypeScript'
          />
          <Technology
            imgSrc='https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo.png'
            label='Redux'
          />
          <Technology
            imgSrc='https://cdn.icon-icons.com/icons2/2389/PNG/512/expo_logo_icon_145293.png'
            label='Expo'
          />
          {/* https://cdn.worldvectorlogo.com/logos/expo-go-app.svg */}
          <Technology
            imgSrc='https://www.svgrepo.com/show/374068/scss.svg'
            label='Scss'
          />
          <Technology
            imgSrc='https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjC97Z8BResg5dlPqczsRCFhP6zewWX0X0e7fVPG-G7PuUZwwZVsi9OPoqJYkgqT2h0FI95SsmWzVEgpt8b8HAqFiIxZ98TFtY4lE0b8UrtVJ2HrJebRwl6C9DslsQDl9KnBIrdHS6LtkY/s1600/jetpack+compose+icon_RGB.png'
            label='Jetpack Compose'
          />
          <Technology
            imgSrc='https://www.logo.wine/a/logo/Kotlin_(programming_language)/Kotlin_(programming_language)-Logo.wine.svg'
            label='Kotlin'
          />
          <Technology
            imgSrc='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-512.png'
            label='Java'
          />
          <Technology
            imgSrc='https://www.svgrepo.com/show/353782/git-icon.svg'
            label='Git'
          />
        </Flex>

        {/* Other Technologies */}
        <Box w='100%' textAlign='center' mt={10}>
          <Heading
            fontSize='3xl'
            color={colors.secondary}
            mb={6}
            fontFamily={fonts.main}
          >
            Other Technologies
          </Heading>
        </Box>
        <Flex gap={4} wrap='wrap' justify='center' p={4}>
          <Technology
            imgSrc='https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg'
            label='C++'
          />
          <Technology
            imgSrc='https://www.svgrepo.com/show/354119/nodejs-icon.svg'
            label='Node.js'
          />
          <Technology
            imgSrc='https://www.svgrepo.com/show/355133/mysql.svg'
            label='MySQL'
          />
          <Technology
            imgSrc='https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg'
            label='Figma'
          />
          <Technology
            imgSrc='https://www.svgrepo.com/show/353985/laravel.svg'
            label='Laravel'
          />
          <Technology
            imgSrc='https://static.cdnlogo.com/logos/p/20/postman.svg'
            label='Postman'
          />
          <Technology
            imgSrc='https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg'
            label='AWS'
          />
        </Flex>
      </Flex>
    </Box>
  )
}

function Technology ({ imgSrc, label }) {
  const { colors, fonts } = useColorMode()
  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      p={4}
      w='150px'
      h='150px'
      bg={colors.background}
      borderRadius='lg'
      shadow='md'
      _hover={{
        bg: colors.backgroundSecondary,
        transform: 'scale(1.05)',
        transition: '0.3s'
      }}
    >
      <img
        src={imgSrc}
        alt={label}
        style={{ width: '55px', height: '55px', marginBottom: '12px' }}
      />
      <Text
        fontSize='lg'
        fontWeight='bold'
        color={colors.textSecondary}
        textAlign='center'
        fontFamily={fonts.main}
      >
        {label}
      </Text>
    </Flex>
  )
}

export default ToolsSection
