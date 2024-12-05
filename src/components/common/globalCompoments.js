import { motion } from 'framer-motion'
import { Text } from '@chakra-ui/react'
import { useColorMode } from '../ui/color-mode'

const MotionText = motion(Text)
export const RevealingText = ({ text, delay = 0.2, color, size }) => {
  const words = text.split(' ')
  const { colors, fonts } = useColorMode()

  return (
    <div>
      {words.map((word, index) => (
        <MotionText
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * delay }}
        fontWeight='bold'
          style={{ display: 'inline-block', marginRight: '10px' }}
          color={color ?? colors.text}
          fontSize={size ?? fonts.sizes.titleSec}
          fontFamily={fonts.main}
        >
          {word}
        </MotionText>
      ))}
    </div>
  )
}
