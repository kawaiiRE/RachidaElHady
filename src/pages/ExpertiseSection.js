import React from 'react'
import { Box, Flex, Text, Heading } from '@chakra-ui/react'
import { useColorMode } from '../components/ui/color-mode'

function ExpertiseSection () {
  const { colors } = useColorMode()
  return (
    <Box py={8} px={4} w='90%' mx='auto'>
      {/* Main Title */}
      <Box textAlign='center' mb={10}>
        <Heading fontSize='5xl' fontWeight='bold' color={colors.primary}>
          Your Vision, Brought to Life
        </Heading>
      </Box>

      {/* Row of Expertise Blocks */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        align='stretch'
        gap={8}
      >
        {/* Block 1 */}
        <Box
          flex='1'
          p={6}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='lg'
          shadow='md'
          bg={colors.backgroundSecondary}
          display='flex'
          flexDirection='column'
        >
          <Heading fontSize='2xl' color={colors.primary} mb={4}>
            Continuous Support
          </Heading>
          <Text color={colors.textSecondary} flex='1'>
            I ensure your web-based software stays efficient and competitive. By
            employing DevOps processes, I deliver urgent updates within hours
            and release new features consistently.
          </Text>
        </Box>

        {/* Block 2 */}
        <Box
          flex='1'
          p={6}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='lg'
          shadow='md'
          bg={colors.backgroundSecondary}
          display='flex'
          flexDirection='column'
        >
          <Heading fontSize='2xl' color={colors.primary} mb={4}>
            Back-End Development
          </Heading>
          <Text color={colors.textSecondary} flex='1'>
            I implement your app’s business logic with proven frameworks,
            ensuring reliable and fast back-end development. APIs are structured
            for seamless integrations.
          </Text>
        </Box>

        {/* Block 3 */}
        <Box
          flex='1'
          p={6}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='lg'
          shadow='md'
          bg={colors.backgroundSecondary}
          display='flex'
          flexDirection='column'
        >
          <Heading fontSize='2xl' color={colors.primary} mb={4}>
            Front-End Design & Development
          </Heading>
          <Text color={colors.textSecondary} flex='1'>
            I translate audience insights into user-centric UI designs. Using
            modern front-end technologies, I bring your app’s look and feel to
            life, ensuring a seamless experience.
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default ExpertiseSection
