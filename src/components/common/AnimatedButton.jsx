import { Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useColorMode } from '../ui/color-mode'

const MotionButton = motion(Button)

export const AnimatedButton = ({ children, ...props }) => {
  const { colors, fonts } = useColorMode()
  const handleHoverEnd = event => {
    event.target?.animate(
      [
        { transform: 'scaleX(1.1)' },
        { transform: 'scaleX(1)' },
        { transform: 'scaleX(1.1)' },
        { transform: 'scaleX(1)' }
      ],
      { duration: 600, easing: 'ease-out' }
    )
  }

  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverEnd={handleHoverEnd}
      bg={colors.backgroundInverted}
      _hover={{ transform: 'scale(1.1)' }}
      _active={{ transform: 'scale(0.9)' }}
      borderRadius='md'
      fontWeight='bold'
      color={colors.textInverted}
      fontSize={fonts.sizes.subText}
      colorScheme='teal'
      fontFamily={fonts.main}
      w='fit-content'
      {...props}
    >
      {children}
    </MotionButton>
  )
}
