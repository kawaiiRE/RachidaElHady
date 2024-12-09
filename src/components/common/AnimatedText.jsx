import React, { useState, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useColorMode } from '../ui/color-mode'

const MotionText = motion(Text)

export const AnimatedText = ({
  textArray,
  withBolding = false,
  delay = 0,
  centerText = false,
  ...props
}) => {
  const { colors, fonts } = useColorMode()
  const [visibleSentences, setVisibleSentences] = useState([])
  // console.log({ delay })
  useEffect(() => {
    const checkInitialVisibility = () => {
      textArray.forEach((_, index) => {
        const sentenceElement = document.getElementById(`sentence-${index}`)
        if (sentenceElement) {
          const rect = sentenceElement.getBoundingClientRect()
          if (
            rect.top < window.innerHeight
            //  - 20
          ) {
            // Mark as visible if already in view
            setVisibleSentences(prev => {
              if (!prev.includes(index)) {
                return [...prev, index]
              }
              return prev
            })
          }
        }
      })
    }

    const handleScroll = () => {
      textArray.forEach((_, index) => {
        const sentenceElement = document.getElementById(`sentence-${index}`)
        if (sentenceElement) {
          const rect = sentenceElement.getBoundingClientRect()
          if (
            rect.top < window.innerHeight
            //  - 20
          ) {
            // When the sentence comes into view
            setVisibleSentences(prev => {
              if (!prev.includes(index)) {
                return [...prev, index]
              }
              return prev
            })
          }
        }
      })
    }

    // Check initial visibility on load
    checkInitialVisibility()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [textArray])

  const splitAndStyleText = text => {
    if (withBolding) {
      return text.split(' ').map((word, index) => {
        const midIndex = Math.ceil(word.length / 2)
        return (
          <React.Fragment key={index}>
            <b>{word.slice(0, midIndex)}</b>
            {word.slice(midIndex)}{' '}
          </React.Fragment>
        )
      })
    }
    return text
  }

  const sentenceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 50, delay: delay }
    }
  }

  return (
    <Box textAlign={centerText ? 'center' : 'start'}>
      {textArray.map((text, index) => (
        <MotionText
          id={`sentence-${index}`}
          key={index}
          variants={sentenceVariants}
          initial='hidden'
          animate={visibleSentences.includes(index) ? 'visible' : 'hidden'}
          mb={4}
          color={colors.text}
          fontSize={fonts.sizes.toolsText}
          fontFamily={fonts.main}
          {...props}
        >
          {splitAndStyleText(text)}
        </MotionText>
      ))}
    </Box>
  )
}
