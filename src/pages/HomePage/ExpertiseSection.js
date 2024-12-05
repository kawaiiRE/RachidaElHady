import React from 'react'
import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { useColorMode } from '../../components/ui/color-mode'

function ExpertiseSection () {
  const { colors, fonts } = useColorMode()
  return (
    <Box py={8} w='90%' mx='auto' id='expertiseSection' paddingTop='60px'>
      {/* Main Title */}
      <Box textAlign='center' mb={10}>
        <Text
          fontSize={fonts.sizes.title}
          fontWeight='bold'
          color={colors.primary}
          fontFamily={fonts.main}
        >
          Your Vision, Brought to Life
        </Text>
      </Box>

      {/* Row of Expertise Blocks */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        align='stretch'
        gap={8}
      >
        {ExpertisePreview({
          title: 'Front-End Design & Development',
          description:
            'I translate audience insights into user-centric UI designs. Using modern front-end technologies, I bring your app’s look and feel to life, ensuring a seamless experience.'
        })}
        {ExpertisePreview({
          title: 'Back-End Development',
          description:
            'I implement your app’s business logic with proven frameworks, ensuring reliable and fast back-end development. APIs are structured for seamless integrations.'
        })}
        {ExpertisePreview({
          title: 'Continuous Support',
          description:
            'I ensure your web-based software stays efficient and competitive. By employing DevOps processes, I deliver urgent updates within hours and release new features consistently.'
        })}
      </Flex>
    </Box>
  )
}

export default ExpertiseSection

const ExpertisePreview = ({ title, description }) => {
  const { colors, fonts } = useColorMode()
  return (
    <Box
      flex='1'
      p={6}
      border='1px solid'
      borderColor={colors.border}
      borderRadius='lg'
      shadow='md'
      bg={colors.backgroundSecondary}
      display='flex'
      flexDirection='column'
    >
      <Text
        fontWeight='bold'
        fontSize={fonts.sizes.subTitle}
        color={colors.primary}
        mb={4}
        fontFamily={fonts.main}
      >
        {title}
      </Text>
      <Text
        color={colors.textSecondary}
        flex='1'
        fontFamily={fonts.main}
        fontSize={fonts.sizes.subText}
      >
        {description}
      </Text>
    </Box>
  )
}
