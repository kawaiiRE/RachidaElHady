import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import GTBg from '../../assets/images/GTBg.png'
import DivisionBg from '../../assets/images/DivisionBg.png'
import CirclesBg from '../../assets/images/CirclesBg.png'
import GreaterThanIntro from '../../assets/images/GreaterThanIntro.png'
import DivisionIntro from '../../assets/images/DivisionIntro.png'
import CirclesIntro from '../../assets/images/CirclesIntro.png'
import MiniGame from './MiniGames/MiniGame'
import SudokuCirclesNumbers from './SudokuCirclesNumbers'
import { isMobile } from '../../components/common/predefined'
import { AnimatedButton } from '../../components/common/AnimatedButton'

const MotionBox = motion(Box)
const link =
  'https://play.google.com/store/apps/details?id=com.kawaiire.crazysudoku'

const gameTypes = [
  {
    name: 'Greater Than',
    type: 'greaterThan',
    pageUrl: '/greater-than',
    imgIntroSrc: GreaterThanIntro,
    imgSrc: GTBg,
    bg: 'blue',
    bgStyle: {
      transform: isMobile ? 'scale(1.5)' : 'none'
    }
  },
  {
    name: 'Division',
    type: 'division',
    pageUrl: '/division',
    imgIntroSrc: DivisionIntro,
    imgSrc: DivisionBg,
    bg: 'red',
    bgStyle: {
      transform: isMobile ? 'scale(1.5)' : 'none'
    }
  },
  {
    name: 'Circles',
    type: 'circles',
    pageUrl: '/circles',
    imgIntroSrc: CirclesIntro,
    imgSrc: CirclesBg,
    bg: 'pink',
    bgStyle: {
      top: '-150px',
      right: '-250px',
      objectFit: 'contain',
      transform: 'scale(1.35)'
    }
  }
]

export default function GameTypesSection () {
  const [currentGame, setCurrentGame] = useState(0)
  const [isClicked, setIsClicked] = useState(false)
  const [isCurrentlyPlayingMiniGame, setIsCurrentlyPlayingMiniGame] =
    useState(false)
  const navigate = useNavigate()

  const changeGameType = index => {
    setCurrentGame(index)
    setIsClicked(true)
  }

  useEffect(() => {
    let id

    if (!isCurrentlyPlayingMiniGame) {
      const intervalTime = isClicked ? 10000 : 5000

      id = setInterval(() => {
        setCurrentGame(prev => (prev + 1) % gameTypes.length)
      }, intervalTime)

      if (isClicked) {
        setTimeout(() => {
          setIsClicked(false)
        }, 10000)
      }
    }

    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [isClicked, isCurrentlyPlayingMiniGame])

  const handlePlayNowClick = () => {
    navigate(gameTypes[currentGame].pageUrl)
  }

  const handleMouseEnter = () => {
    setIsCurrentlyPlayingMiniGame(true)
  }

  const handleMouseLeave = () => {
    setIsCurrentlyPlayingMiniGame(false)
  }

  return (
    <Box
      textAlign='center'
      my={10}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Game Selector */}
      <Flex
        justify='center'
        mb={3}
        width={isMobile ? '90%' : '80%'}
        justifyContent='space-between'
        justifySelf='center'
        display='inline-flex'
      >
        {gameTypes.map((game, index) => (
          <MotionBox
            key={index}
            zIndex={10}
            height='110px'
            width={
              isMobile
                ? currentGame === index
                  ? '45%'
                  : '38%'
                : currentGame === index
                ? '35%'
                : '30%'
            }
            p={isMobile ? 1 : 4}
            borderRadius='md'
            // bg={game.bg}
            color='white'
            fontSize='lg'
            cursor='pointer'
            position='relative'
            // transform='scale(0.9)'
            transform={isMobile ? 'none' : 'scale(0.9)'}
            onClick={() => changeGameType(index)}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.85 }}
            // bgImage={gameTypes[currentGame].imgSrc}
          >
            <Image
              src={game.imgIntroSrc}
              alt={game.name}
              position='absolute'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
              opacity={1}
              objectFit='contain'
              filter='drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))'
              borderRadius='8px'
              // transform='scale(1.5)'
            />
            {game.name}
          </MotionBox>
        ))}
      </Flex>

      {/* Game Showcase */}
      <MotionBox
        justify='center'
        key={gameTypes[currentGame].name}
        height='450px'
        width={isMobile ? '90%' : '80%'}
        // bg={gameTypes[currentGame].bg}
        borderRadius='md'
        position='relative'
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        display='inline-flex'
        overflow='hidden'
      >
        <Image
          src={gameTypes[currentGame].imgSrc}
          alt={gameTypes[currentGame].name}
          position='absolute'
          {...gameTypes[currentGame].bgStyle}
          //   top='-150px'
          //   right='-250px'
          opacity={0.3}
          //   objectFit='contain'
          //   transform='scale(1.35)'
        />
        <Box
          position='absolute'
          top='50%'
          left='50%'
          // bg='red'
          height='250px'
          width='250px'
          transform='translate(-50%, -50%)'
        >
          <MiniGame gameType={gameTypes[currentGame].type} />
          {/* <SudokuCirclesNumbers/> */}
        </Box><Box 
  display="flex" 
  justifyContent="center" 
  alignItems="flex-end" 
  height="100vh" 
  width="100%"
>
        <AnimatedButton
          position='absolute'
          bottom='20px'
          // left='50%'
          // transform='translateX(-50%)'
          colorScheme='teal'
          height='50px'
          width={isMobile ? '40%' : '20%'}
          // onClick={handlePlayNowClick}
          onClick={() => {
            const newTab = window.open(link, '_blank')
            newTab.focus()
          }}
          background='#61c5ff'
          backgroundSize='200% 100%'
          animation='backgroundColorShift 4s linear infinite'
          color='white' // Button text color
          border='none' // Optional remove border
          borderRadius='8px' // Optional add rounded corners
        >
          Play Now
        </AnimatedButton></Box>
        <style>
          {`
    @keyframes backgroundColorShift {
      0% {
        background-color: #61c5ff; /* Blue */
      }
      50% {
        background-color: #ff78a5; /* Pink */
      }
      100% {
        background-color: #61c5ff; /* Blue */
      }
    }
  `}
        </style>
      </MotionBox>
    </Box>
  )
}
