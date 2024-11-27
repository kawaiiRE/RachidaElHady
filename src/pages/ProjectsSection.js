import React, { useEffect, useRef, useState } from 'react'
import { Box, Heading, Text, Flex, Link, Button, Image } from '@chakra-ui/react'
import CrazySudokuPrev1 from '../assets/images/CrazySudokuPrev1.jpg'
import CrazySudokuPrev2 from '../assets/images/CrazySudokuPrev2.png'
import CrazySudokuPrev3 from '../assets/images/CrazySudokuPrev3.png'
import CrazySudokuPrev4 from '../assets/images/CrazySudokuPrev4.jpg'
import CrazySudokuPrev5 from '../assets/images/CrazySudokuPrev5.png'
import CrazySudokuBg from '../assets/images/CrazySudokuBg.png'
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io'
import { useColorMode } from '../components/ui/color-mode'

const crazySudokuImages = [
  CrazySudokuPrev1,
  CrazySudokuPrev2,
  CrazySudokuPrev3,
  CrazySudokuPrev4,
  CrazySudokuPrev5
]

function ProjectsSection () {
  const { colors } = useColorMode()
  return (
    <Box py={8} px={4} w='90%' mx='auto'>
      {/* Main Title */}
      <Box textAlign='center' mb={10}>
        <Heading fontSize='5xl' fontWeight='bold' color={colors.primary}>
          My Projects
        </Heading>
        <Text fontSize='xl' color={colors.textSecondary} mt={4}>
          Explore some of the projects I've worked on.
        </Text>
      </Box>

      {/* Projects List */}
      <Flex direction='column' gap={8}>
        {ProjectPreview({
          title: 'Crazy Sudoku',
          description:
            'A mobile app developed using React Native, Expo, and Git. Integrated ads and in-app payments for a fun and challenging Sudoku experience.',
          link: 'https://play.google.com/store/apps/details?id=com.kawaiire.crazysudoku',
          images: crazySudokuImages,
          bgImg: CrazySudokuBg
        })}
        {/* {ProjectPreview({
          title: 'FiestaGo - Event Planning System', 
          description:
            'Full-stack event planning system built using React, React Native, JavaScript, Node.js, and AWS. Features role-based group planning and ticket customization.'
          //   link: 'https://example.com/app-link', // Replace with the actual link to the app
          //   images: [SecondAppImg1, SecondAppImg2, SecondAppImg3], // Replace with actual image variables
          //   bgImg: SecondAppBg // Replace with the background image variable
        })} */}
      </Flex>
    </Box>
  )
}

export default ProjectsSection

const ProjectPreview = ({ title, description, link, images, bgImg }) => {
  const scrollContainerRef = useRef(null)
  const { colors } = useColorMode()
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }
  }

  const scroll = direction => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        scrollContainerRef.current.firstChild?.offsetWidth || 300 // Default to 300px
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    updateScrollState()
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollState)
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollState)
      }
    }
  }, [])

  return (
    <>
      <Heading
        fontSize='5xl'
        color={colors.primary}
        mt={4}
        textDecoration='underline'
      >
        {title}
      </Heading>
      <Flex
        direction='row'
        // alignItems='center'
        alignItems='stretch'
        justifyContent='space-between'
        w='100%'
        py={6}
        px={4}
        gap={8}
      >
        {/* Project Content */}
        <Box
          w={images ? '30%' : '100%'}
          // display='flex'
          display='flex'
          flexDirection='column'
          justifyContent='space-evenly'
        >
          {bgImg && (
            <Box
              flexShrink={0}
              // w='70%'
              mx='auto'
              borderRadius='lg'
              textAlign='center'
              display='flex'
              alignItems='center'
              justifyContent='center'
              py={2}
            >
              <Image
                src={bgImg}
                alt={`${title} Background`}
                w='90%'
                h='auto'
                borderRadius='lg'
              />
            </Box>
          )}
          <Text fontSize='md' color={colors.textSecondary} mt={2}>
            {description}
          </Text>
          {/* <Link
              href='https://play.google.com/store/apps/details?id=com.kawaiire.crazysudoku'
              isExternal
            > */}
          {link && (
            <Button
              colorScheme='teal'
              mt={4}
              onClick={() => {
                const newTab = window.open(link, '_blank')
                newTab.focus()
              }}
            >
              View on Google Play
            </Button>
          )}
          {/* </Link> */}
        </Box>

        {/* Project Image */}
        {/* {images && (
          <Box
            overflowX='scroll'
            display='flex'
            w='70%'
            sx={{
              '::-webkit-scrollbar': { display: 'none' }
            }}
            gap={3}
            // bg='gray.200'
          >
            {images.map((src, index) => (
              <Box
                key={index}
                flexShrink={0}
                // w='70%'
                mx='auto'
                borderRadius='lg'
                textAlign='center'
                display='flex'
                alignItems='center'
                justifyContent='center'
              >
                <Image
                  src={src}
                  alt={`${title} Preview ${index + 1}`}
                  w='200px'
                  h='auto'
                  borderRadius='lg'
                />
              </Box>
            ))}
          </Box>
        )} */}

        {images && (
          <Box position='relative' w='70%'>
            {canScrollLeft && (
              <Button
                position='absolute'
                left='0'
                top='50%'
                transform='translateY(-50%)'
                zIndex={1}
                //   bg="teal.500"
                color={colors.textInverted}
                borderRadius='full'
                onClick={() => scroll('left')}
                _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
                backdropFilter='blur(10px)'
                _webkitBackdropFilter='blur(10px)'
                boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
                bg='rgba(0, 0, 0, 0.5)'
              >
                <IoIosArrowDropleft />
              </Button>
            )}
            <Box
              overflowX='scroll'
              display='flex'
              ref={scrollContainerRef}
              sx={{
                '::-webkit-scrollbar': { display: 'none' }
              }}
              gap={3}
              scrollBehavior='smooth'
            >
              {images &&
                images.map((src, index) => (
                  <Box
                    key={index}
                    flexShrink={0}
                    mx='auto'
                    borderRadius='lg'
                    textAlign='center'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    //   w='300px'
                    //   h='300px'
                  >
                    <Image
                      src={src}
                      alt={`${title} Preview ${index + 1}`}
                      w='200px'
                      h='auto'
                      objectFit='cover'
                      borderRadius='lg'
                    />
                  </Box>
                ))}
            </Box>
            {canScrollRight && (
              <Button
                position='absolute'
                right='0'
                top='50%'
                transform='translateY(-50%)'
                zIndex={1}
                //   bg="teal.500"
                color={colors.textInverted}
                borderRadius='full'
                onClick={() => scroll('right')}
                _hover={{ bg: 'rgba(0, 0, 0, 0.3)' }}
                backdropFilter='blur(10px)'
                _webkitBackdropFilter='blur(10px)'
                boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
                bg='rgba(0, 0, 0, 0.5)'
              >
                <IoIosArrowDropright />
              </Button>
            )}
          </Box>
        )}
      </Flex>
    </>
  )
}