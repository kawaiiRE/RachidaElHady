import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import { FaReact, FaNodeJs, FaGithub, FaSass, FaDatabase } from 'react-icons/fa'
import { useColorMode } from '../../components/ui/color-mode'
import { Text } from '../../components/common/TextComponent'
import { technologies } from '../../components/common/predefined'

function ToolsSection() {
  const { colors, fonts } = useColorMode()
  return (
    <Box py={8} w="90%" mx="auto" id="toolsSection">
      {/* Main Title */}
      <Box textAlign="center" mb={10}>
        <Text
          fontSize={fonts.sizes.title}
          fontWeight="bold"
          color={colors.primary}
        >
          Tools of My Trade
        </Text>
        <Text fontSize={fonts.sizes.text} color={colors.textSecondary} mt={4}>
          The technologies and tools I use to build modern, efficient, and
          scalable applications.
        </Text>
      </Box>

      {/* Technologies Grid */}
      <Flex direction="row" wrap="wrap" justify="center" align="center" gap={8}>
        {/* Frontend Technologies */}
        <Box w="100%" textAlign="center">
          <Text
            fontSize={fonts.sizes.subTitle}
            color={colors.secondary}
            mb={6}
            fontWeight="bold"
          >
            Frontend Technologies I Prefer To Use
          </Text>
        </Box>
        <Flex gap={8} wrap="wrap" justify="center">
          {technologies.frontendTechnologies.map((tech, index) => (
            <Technology
              key={index}
              imgSrc={tech.imgSrc}
              localSrc={tech.localSrc}
              label={tech.label}
            />
          ))}
        </Flex>

        {/* Other Technologies */}
        <Box w="100%" textAlign="center" mt={6}>
          <Text fontSize={fonts.sizes.subTitle} color={colors.secondary} mb={6}>
            Other Technologies
          </Text>
        </Box>
        <Flex gap={4} wrap="wrap" justify="center" p={4}>
          {technologies.otherTechnologies.map((tech, index) => (
            <Technology
              key={index}
              imgSrc={tech.imgSrc}
              localSrc={tech.localSrc}
              label={tech.label}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

function Technology({ imgSrc, label, localSrc }) {
  const { colors, fonts } = useColorMode()
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      p={4}
      w={fonts.sizes.toolsSize}
      h={fonts.sizes.toolsSize}
      bg={colors.background}
      borderRadius="lg"
      shadow="md"
      _hover={{
        bg: colors.backgroundSecondary,
        transform: 'scale(1.05)',
        transition: '0.3s',
      }}
    >
      <Image
        src={localSrc || imgSrc}
        alt={label}
        width={fonts.sizes.toolsImg}
        height={fonts.sizes.toolsImg}
        style={{
          marginBottom: '12px',
          objectFit: 'contain',
        }}
      />
      <Text
        fontSize={fonts.sizes.toolsText}
        fontWeight="bold"
        color={colors.textSecondary}
        textAlign="center"
        isTitle={true}
      >
        {label}
      </Text>
    </Flex>
  )
}

export default ToolsSection
