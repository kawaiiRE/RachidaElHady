import React, { useEffect, useState } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionText = motion(Text)
const MotionBox = motion(Box)

const generateGradientColor = (startColor, endColor, percentage) => {
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

  return `rgb(${r}, ${g}, ${b})`
}

function CrazySudoku () {
  const [animationKey, setAnimationKey] = useState(0)
  const [showSplash, setShowSplash] = useState(false)
  useEffect(() => {
    // Change the color of the 'S' after 2 seconds
    const timeout = setTimeout(() => {
      const sElement = document.querySelector('#sudoku-text-an');
      if (sElement) {
        sElement.style.display = 'inline-block'
        sElement.style.color = 'transparent'
        sElement.style.background = 'linear-gradient(90deg, #61c5ff, #61c5ff, #ff78a5, #ff78a5, #61c5ff)'
        sElement.style.backgroundSize = '200% 100%'
        sElement.style.animation = 'gradientShift 2s linear infinite'
        sElement.style.WebkitBackgroundClip = 'text'
        sElement.style.backgroundClip = 'text'
      }
    }, 2000);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []);

  // const handleBubblePop = () => {
  //   setTimeout(() => {
  //     setShowSplash(true) // Trigger background splash after popping
  //   }, 2000) // Adjust timing to match the bubble animations
  // }

  // useEffect(() => {
  //   handleBubblePop()
  // }, [animationKey])

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
        // { transform: 'translateX(25px) scaleX(1.1)' },
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
        // { transform: 'translateX(55px) scaleX(1.1)' },
        { transform: 'translateX(10px) scaleX(1)' }
      ],
      { duration: 600, easing: 'ease-out' }
    )
  }

  const [poppedBubbles, setPoppedBubbles] = useState({})

  // const handlePop = bubbleIndex => {
  //   setPoppedBubbles(prev => ({
  //     ...prev,
  //     [bubbleIndex]: true // Mark the bubble as popped
  //   }))
  // }
  // const handlePop = (bubbleId) => {
  //   const bubble = document.getElementById(bubbleId);

  //   if (bubble) {
  //     // Pop animation
  //     bubble.animate(
  //       [
  //         { transform: "scale(1)", opacity: 1 },
  //         { transform: `scale(${Math.random() * (4.5 - 3) + 3})`, opacity: 0 },
  //       ],
  //       {
  //         duration: 500,
  //         easing: "ease-out",
  //         fill: "forwards",
  //       }
  //     );

  //     // Remove bubble after 2 seconds
  //     setTimeout(() => {
  //       bubble.style.display = "none";
  //     }, 2000);

  //     // Recreate the bubble after 3 seconds
  //     setTimeout(() => {
  //       bubble.style.display = "block";
  //       bubble.style.transform = "scale(1)";
  //       bubble.style.opacity = "1";
  //     }, 5000); // 2 seconds disappear + 3 seconds delay = 5 seconds
  //   }
  // };

  const addBubble = bubbleId => {
    // Create a new bubble element
    const bubble = document.createElement('div')

    // Set styles for the bubble
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
    bubble.style.top = `${Math.random() * 80 + 10}%`
    bubble.style.left = `${Math.random() * 100}%`
    bubble.style.cursor = 'pointer'
    bubble.style.zIndex = 5

    // Append to the container
    document.getElementById('bubbles-clickable').appendChild(bubble)

    // Add random movement animation to the bubble
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
        duration: 10000, // Duration of the animation
        iterations: Infinity,
        easing: 'linear'
      }
    )

    // Handle bubble pop on click
    bubble.onclick = () => handlePop(bubbleId)
  }

  const handlePop = bubbleId => {
    const bubble = document.getElementById(bubbleId)
    // Trigger pop animation (scale and fade out)
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

    // Remove the bubble after the animation ends
    setTimeout(() => {
      bubble.remove()
    }, 500) // Wait for the pop animation to finish before removing

    // Create a new bubble after 3 seconds
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
      x = Math.random() * (max - min) + min // Random x position
      y = Math.random() * (max - min) + min // Random y position
    } while (Math.abs(x - 50) + Math.abs(y - 50) < excludedSize)

    return { top: `${y}%`, left: `${x}%` }
  }

  return (
    <>
      <Box
        height='500px'
        position='relative'
        overflow='hidden'
        // bg={showSplash ? 'linear-gradient(to right, pink, blue)' : 'black'}
        top='-30px'
        bg='transparent'
      >
        {/* {!showSplash && ( */}
        <MotionBox
          position='absolute'
          width='100%'
          height='100%'
          zIndex={0}
          id='bubbles'
          key={'bubbles'}
        >
          {Array.from({ length: 50 }).map((_, i) => {
            const randomDelay = Math.random() * 3 // Random delay for pop
            const bubbleId = `bubble-${i}`
            const { top, left } = generateRandomPosition(0, 100, 40)
            return (
              <MotionBox
                key={bubbleId}
                id={bubbleId}
                position='absolute'
                width='40px'
                height='40px'
                borderRadius='50%'
                bg={generateGradientColor('#61c5ff', '#ff78a5', Math.random())}
                // top={`${Math.random() * 80 + 10}%`}
                // left={`${Math.random() * 100}%`}
                top={top}
                left={left}
                initial={{ scale: 1, opacity: 1 }}
                // animate={{
                //   x: [0, Math.random() * 100 - 25, 0],
                //   y: [0, Math.random() * 100 - 25, 0],
                //   opacity: [1, 0.5, 1]
                // }}
                // cursor='pointer'
                // whileHover={{ scale: 1.2 }}
                // _hover={{ transform: 'scale(1.2)' }}
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
                // onClick={() => handlePop(bubbleId)}
                zIndex={1}
                onAnimationStart={() => {
                  // if (i > 10) {
                  setTimeout(() => {
                    const bubble = document.getElementById(bubbleId)
                    const randomScale = Math.random() * (4.5 - 3) + 3
                    if (bubble) {
                      bubble.animate(
                        [
                          { transform: 'scale(1)', opacity: 1 },
                          {
                            transform: `scale(${randomScale})`,
                            opacity: Math.max(0.2, Math.random())
                          }
                        ],
                        { duration: 500, easing: 'ease-out', fill: 'forwards' }
                      )
                    }
                  }, Math.random() * 2000)
                  // }
                }}
              />
            )
          })}
        </MotionBox>
        {/* )} */}

        {/* Splash Background */}
        {/* {showSplash && (
          <MotionBox
            position='absolute'
            width='100%'
            height='100%'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )} */}

        {/* Crazy Text */}
        <MotionBox
          position='absolute'
          width='100%'
          height='100%'
          zIndex={2}
          id='bubbles-clickable'
          key={'bubbles-clickable'}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const bubbleId = `bubble-clickable-${i}`
            const { top, left } = generateRandomPosition(0, 100, 30)
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
                // top={`${Math.random() * 80 + 10}%`}
                // left={`${Math.random() * 100}%`}
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
                zIndex={5}
              />
            )
          })}
        </MotionBox>
        <Box
          textAlign='center'
          zIndex={1}
          position='relative'
          h='100%'
          alignContent='center'
        >
          <MotionText
            key={`${animationKey}-crazy`}
            id='crazy-text'
            display='inline-block'
            fontSize='7xl'
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
          <MotionText
            key={`${animationKey}-sudoku`}
            id='sudoku-text'
            display='inline-block'
            fontSize='7xl'
            fontWeight='bold'
            // color='#ff78a5'
            initial={{ x: 300, opacity: 0 }}
            animate={{
              x: [300, 0, -10, 10],
              opacity: 1 // Animates in with a "slamming" effect
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25,
              delay: 1.5
            }}
            onAnimationStart={() => {
              // Start Crazy animation slightly before Sudoku ends
              setTimeout(() => {
                triggerCrazyBounce()
              }, 1650) // Adjust timing for smoother overlap
            }}
          >
            {/* Sudoku */}
         <Box as='span' id='sudoku-text-an' color='#ff78a5'>
          Sudoku
        </Box>
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
        {/* <Text as='span' id='s-text' color='#ff78a5'>
          S
        </Text>
        <Text as='span' color='#ff78a5'>
          udOku
        </Text> */}
          </MotionText>
        </Box>
      </Box>
      <Button
        mt={5}
        colorScheme='teal'
        onClick={() => setAnimationKey(prevKey => prevKey + 1)} // Increment key to restart animation
      >
        Restart Animation
      </Button>
    </>
  )
}

export default CrazySudoku
