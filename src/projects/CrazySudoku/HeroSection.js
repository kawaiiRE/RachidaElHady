import React, { useEffect, useState } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useColorMode } from '../../components/ui/color-mode'
import { AnimatedButton } from '../../components/common/AnimatedButton'
import { isMobile } from '../../components/common/predefined'
import { FiDownload } from 'react-icons/fi'
import { AnimatedText } from '../../components/common/AnimatedText'

const MotionText = motion(Text)
const MotionBox = motion(Box)

const generateGradientColor = (
  startColor,
  endColor,
  percentage,
  opacity = 1
) => {
  const start = parseInt(startColor.slice(1), 16)
  const end = parseInt(endColor.slice(1), 16)

  const r = Math.round(
    (1 - percentage) * ((start >> 16) & 255) + percentage * ((end >> 16) & 255)
  )
  const g = Math.round(
    (1 - percentage) * ((start >> 8) & 255) + percentage * ((end >> 8) & 255)
  )
  const b = Math.round(
    (1 - percentage) * (start & 255) + percentage * (end & 255)
  )

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const bubbleDiameter = isMobile ? '110px' : '150px'

function HeroSection () {
  const { colors, fonts } = useColorMode()
  //   const [animationKey, setAnimationKey] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const sElement = document.querySelector('#sudoku-text')
      if (sElement) {
        sElement.style.display = 'inline-block'
        sElement.style.color = 'transparent'
        sElement.style.background =
          'linear-gradient(90deg, #61c5ff, #61c5ff, #ff78a5, #ff78a5, #61c5ff)'
        sElement.style.backgroundSize = '200% 100%'
        sElement.style.animation = 'gradientShift 2s linear infinite'
        sElement.style.WebkitBackgroundClip = 'text'
        sElement.style.backgroundClip = 'text'
      }
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  const triggerCrazyBounce = () => {
    const crazy = document.getElementById('crazy-text')
    crazy?.animate(
      [
        { transform: 'translateX(0px) scaleX(1)' },
        { transform: 'translateX(-30px) scaleX(0.9)' },
        { transform: 'translateX(-40px) scaleX(0.8)' },
        { transform: 'translateX(-30px) scaleX(0.9)' },
        { transform: 'translateX(15px) scaleX(1.05)' },
        { transform: 'translateX(40px) scaleX(1.2)' },
        { transform: 'translateX(0px) scaleX(1)' }
      ],
      { duration: 600, easing: 'ease-out' }
    )
    const sudoku = document.getElementById('sudoku-text')
    sudoku?.animate(
      [
        { transform: 'translateX(0px) scaleX(1)' },
        { transform: 'translateX(-60px) scaleX(0.9)' },
        { transform: 'translateX(-90px) scaleX(0.8)' },
        { transform: 'translateX(-60px) scaleX(0.9)' },
        { transform: 'translateX(30px) scaleX(1.05)' },
        { transform: 'translateX(110px) scaleX(1.1)' },
        { transform: 'translateX(10px) scaleX(1)' }
      ],
      { duration: 600, easing: 'ease-out' }
    )
  }

  const addBubble = bubbleId => {
    const bubble = document.createElement('div')

    bubble.id = bubbleId
    bubble.style.position = 'absolute'
    bubble.style.width = '40px'
    bubble.style.height = '40px'
    bubble.style.borderRadius = '50%'
    bubble.style.background = generateGradientColor(
      '#61c5ff',
      '#ff78a5',
      Math.random()
    )
    const { top, left } = generateRandomPosition(5, 90, isMobile ? 40 : 30)
    bubble.style.top = top
    bubble.style.left = left
    bubble.style.cursor = 'pointer'
    bubble.style.zIndex = 5

    document.getElementById('bubbles-clickable').appendChild(bubble)

    bubble.animate(
      [
        { transform: 'translate(0, 0)', opacity: 1 },
        {
          transform: `translate(${Math.random() * 100 - 50}px, ${
            Math.random() * 100 - 50
          }px)`,
          opacity: 0.5
        },
        { transform: 'translate(0, 0)', opacity: 1 }
      ],
      {
        duration: 10000,
        iterations: Infinity,
        easing: 'linear'
      }
    )

    bubble.onclick = () => handlePop(bubbleId)
  }

  const handlePop = bubbleId => {
    const bubble = document.getElementById(bubbleId)
    bubble.animate(
      [
        { transform: 'scale(1)', opacity: 1 },
        { transform: `scale(${Math.random() * (4.5 - 3) + 3})`, opacity: 0 }
      ],
      {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards'
      }
    )

    setTimeout(() => {
      bubble.remove()
    }, 500)

    setTimeout(() => {
      addBubble(bubbleId)
    }, 3000)
  }

  const generateRandomKeyframes = (range, steps) => {
    const keyframes = Array.from(
      { length: steps - 1 },
      () => Math.random() * range - range / 2
    )
    return [0, ...keyframes, 0]
  }

  const generateRandomPosition = (min, max, excludedSize) => {
    let x, y

    do {
      x = Math.random() * (max - min) + min
      y = Math.random() * (max - min) + min
    } while (Math.abs(x - 50) + Math.abs(y - 50) < excludedSize)

    return { top: `${y}%`, left: `${x}%` }
  }

  return (
    <>
      <Box
        height={isMobile ? '400px' : '500px'}
        position='relative'
        overflow='hidden'
        top='-30px'
        bg='transparent'
      >
        {/* Bg Bubbles */}
        <MotionBox
          position='absolute'
          width='100%'
          height='100%'
          zIndex={0}
          id='bubbles'
          key={'bubbles'}
        >
          {Array.from({ length: isMobile ? 20 : 50 }).map((_, i) => {
            const randomDelay = Math.random() * 3
            const bubbleId = `bubble-${i}`
            const { top, left } = generateRandomPosition(
              0,
              100,
              isMobile ? 50 : 40
            )
            const diameter = isMobile ? '20px' : '40px'
            return (
              <MotionBox
                key={bubbleId}
                id={bubbleId}
                position='absolute'
                width={diameter}
                height={diameter}
                borderRadius='50%'
                bg={generateGradientColor('#61c5ff', '#ff78a5', Math.random())}
                top={top}
                left={left}
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  x: generateRandomKeyframes(100, 5),
                  y: generateRandomKeyframes(100, 5),
                  opacity: 1
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: Math.random() * 1
                }}
                onAnimationStart={() => {
                  setTimeout(() => {
                    const bubble = document.getElementById(bubbleId)
                    const randomScale = Math.random() * (4.5 - 3) + 3
                    if (bubble) {
                      bubble.animate(
                        [
                          // { transform: 'scale(1)', opacity: 1 },
                          {
                            transform: `scale(${randomScale})`,
                            opacity: Math.max(0.2, Math.random())
                          }
                        ],
                        { duration: 500, easing: 'ease-out', fill: 'forwards' }
                      )
                    }
                  }, Math.random() * 2000)
                }}
              />
            )
          })}
        </MotionBox>

        {/* Poppable Bubbles */}
        <MotionBox
          position='absolute'
          width='100%'
          height='100%'
          zIndex={5}
          id='bubbles-clickable'
          key={'bubbles-clickable'}
        >
          {Array.from({ length: isMobile ? 8 : 10 }).map((_, i) => {
            const bubbleId = `bubble-clickable-${i}`
            const { top, left } = generateRandomPosition(
              5,
              90,
              isMobile ? 40 : 30
            )
            const randomNbFrames = Math.random() * (8 - 3) + 3

            return (
              <MotionBox
                key={bubbleId}
                id={bubbleId}
                position='absolute'
                width='40px'
                height='40px'
                borderRadius='50%'
                bg={generateGradientColor('#61c5ff', '#ff78a5', Math.random())}
                top={top}
                left={left}
                initial={{ scale: 1, opacity: 1 }}
                cursor='pointer'
                animate={{
                  x: generateRandomKeyframes(100, randomNbFrames),
                  y: generateRandomKeyframes(100, randomNbFrames),
                  opacity: 1
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  delay: Math.random() * 1
                }}
                onClick={() => handlePop(bubbleId)}
              />
            )
          })}
        </MotionBox>

        {/* Pop Me */}
        <MotionBox
          zIndex={4}
          position='absolute'
          fontWeight='bold'
          fontSize={fonts.sizes.subTitle}
          fontFamily={fonts.main}
          color={colors.textInverted}
          bottom={isMobile ? -3 : -7}
          left={isMobile ? -2 : -3}
          borderRadius='full'
          bg={generateGradientColor(
            '#61c5ff',
            '#ff78a5',
            Math.random(),
            Math.max(0.8, Math.random())
          )}
          p={4}
          // opacity= {Math.max(0.4, Math.random())}
          width={bubbleDiameter}
          height={bubbleDiameter}
          display='flex'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          flexDirection='column'
          lineHeight='1'
          initial={{ x: -300, opacity: 0 }}
          animate={{
            x: [-300, 0, 10, 0],
            opacity: 1
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            delay: 2
          }}
        >
          <Text mb='0'>Catch</Text>
          <Text fontSize={fonts.sizes.subText} mb='0'>
            &
          </Text>
          <Text mt='0'>Pop Me!</Text>
        </MotionBox>

        {/* Crazy Sudoku */}
        <Box
          textAlign='center'
          zIndex={1}
          position='relative'
          h='100%'
          alignContent='center'
        >
          {/* Crazy */}
          <MotionText
            // key={`${animationKey}-crazy`}
            id='crazy-text'
            display='inline-block'
            fontSize={fonts.sizes.heroTitle}
            fontWeight='bold'
            color='#61c5ff'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 14,
              delay: 1
            }}
          >
            Crazy
          </MotionText>
          {/* Sudoku */}
          <MotionText
            // key={`${animationKey}-sudoku`}
            id='sudoku-text'
            as='span'
            color='#ff78a5'
            display='inline-block'
            fontSize={fonts.sizes.heroTitle}
            fontWeight='bold'
            initial={{ x: 300, opacity: 0 }}
            animate={{
              x: [300, 0, -10, 10],
              opacity: 1
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              delay: 1.5
            }}
            onAnimationStart={() => {
              setTimeout(() => {
                triggerCrazyBounce()
              }, 1650)
            }}
          >
            Sudoku
            <style jsx>
              {`
                @keyframes gradientShift {
                  0% {
                    background-position: 0% 50%;
                  }
                  100% {
                    background-position: -200% 50%;
                  }
                }
              `}
            </style>
          </MotionText>
        </Box>
      </Box>

      <AnimatedText
        textArray={[
          'Ready to challenge your mind with Crazy Sudoku?',
        ]}
        fontSize={fonts.sizes.titleSec}
          fontWeight='bold'
        color={colors.text}
        centerText={true}
      />
      <AnimatedText
        textArray={[
          'Sharpen your brain and level up your logic!'
        ]}
        fontSize={fonts.sizes.subTitle}
        color={colors.text}
        centerText={true}
        delay={0.4}
      />

      {/* Download Now! */}
      <AnimatedButton
        zIndex={50}
        position='fixed'
        bottom={5}
        right={5}
        as='span'
        fontSize={fonts.sizes.subTitle}
        initial={{ x: 300, opacity: 0 }}
        animate={{
          x: [300, 0, -10, 0],
          opacity: 1
        }}
        whileHover={{ scale: 1.5 }}
        transition={{
          delay: 2
        }}
        borderRadius='full'
        bg={generateGradientColor(
          '#61c5ff',
          '#ff78a5',
          Math.random(),
          Math.max(0.9, Math.random())
        )}
        animation='pulseAnimation 2s infinite'
        p={4}
        width={bubbleDiameter}
        height={bubbleDiameter}
        display='flex'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        flexDirection='column'
        lineHeight='1.25'
        onClick={() => {
          const newTab = window.open(
            'https://play.google.com/store/apps/details?id=com.kawaiire.crazysudoku',
            '_blank'
          )
          newTab.focus()
        }}
      >
        <Text mt='10px' mb='0'>
          Download
        </Text>
        <Text mt='0'>Now!</Text>
      </AnimatedButton>

      <style jsx>
        {`
          @keyframes pulseAnimation {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}
      </style>
    </>
  )
}

export default HeroSection
