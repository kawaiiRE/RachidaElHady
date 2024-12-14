import React, { useState, useMemo } from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { isNotZeroArray } from '../functions'
import { useColorMode } from '../../../components/ui/color-mode'
import { boardGen } from '../functions'
import SudokuCirclesNumbers from '../SudokuCirclesNumbers'
import { checkConflict } from '../functions'
import { checkForConflicts } from '../functions'
import { generateCursorSVG } from '../functions'
import { isMobile } from '../../../components/common/predefined'

const empty = Array.from({ length: 3 }, () => Array(3).fill(0))
const emptyCircles = Array.from({ length: 2 }, () => Array(4).fill(0))

function MiniGame ({ gameType }) {
  const { colors, fonts } = useColorMode()
  const [puzzleData, setPuzzleData] = useState(
    gameType === 'circles' ? emptyCircles : empty
  )
  const [num, setNum] = useState(1)
  const [flag, setFlag] = useState(false)
  const [isGameCorrect, setIsGameCorrect] = useState(0)
  const [isGameDisabled, setIsGameDisabled] = useState(false)

  const handleWheel = e => {
    console.log(e)
    const decreasing = e.deltaY > 0
    setNum(prev => {
      const n = getNextNum({
        data: puzzleData,
        currentNum: prev,
        smaller: decreasing,
        forced: true
      })
      //   console.log({ n })
      return n
    })
  }

  // useEffect(() => {
  //  console.log(puzzleData)
  // }, [puzzleData])

  const generateRandomArray = () => {
    // console.log({gameType})
    setNum(1)
    setIsGameDisabled(false)
    if (gameType === 'circles') {
      const grid = Array.from({ length: 2 }, () => Array(4).fill(0))
      fillSubgrid2(grid)
      const numbers = shuffleArray([1, 2, 3, 4])
      solveSudoku2(grid, numbers)

      removeRandomElements(grid, 4)
      const grid2 = grid.flat()
      grid2.push(99)

      //   setPuzzleData(convertTo3By3Array(grid2))
      //   return convertTo3By3Array(grid2)
      //   console.log({grid})
      setPuzzleData(grid)
      return grid
    }
    setPuzzleData(empty)
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    shuffleArray(numbers)

    const doubleArray = []
    for (let i = 0; i < 3; i++) {
      doubleArray.push(numbers.slice(i * 3, (i + 1) * 3))
    }
    return doubleArray
  }

  const getNextNum = ({
    data,
    currentNum,
    smaller = false,
    forced = false
  }) => {
    data = data.flat()
    console.log({ data, currentNum })
    if (gameType === 'circles') {
      const range = [1, 2, 3, 4]
      const maxOccurrences = 2 // Each number can appear twice

      // Count occurrences of each number in the array
      const counts = {}
      for (const num of range) {
        counts[num] = data.filter(x => x === num).length
      }

      let availableNums = range.filter(num => counts[num] < maxOccurrences)
      if (availableNums.length === 0) {
        availableNums = [1]
      }

      // Determine next number
      let next
      if (forced) {
        next = currentNum + 1 > range.length ? range[0] : currentNum + 1
      } else if (smaller) {
        next =
          currentNum - 1 < range[0] ? range[range.length - 1] : currentNum - 1
      } else {
        // Normal progression, skipping numbers that have reached their limit
        console.log({ counts })
        console.log(counts[currentNum])
        // next = currentNum
        // while (counts[next] >= maxOccurrences) {
        //   next = next + 1 > availableNums.length ? availableNums[0] : next + 1 // Wrap around
        // }
        if (counts[currentNum] > 1) {
          for (let num of availableNums) {
            if (num > currentNum) return num
          }

          return availableNums[0]
        }
        return currentNum
        // console.log({next})
      }

      // Handle circular wrapping for forced conditions
      if (forced && counts[next] >= maxOccurrences) {
        // Find the first valid number, starting from 1
        next = range.find(num => counts[num] < maxOccurrences)
      }
      if (smaller && counts[next] >= maxOccurrences) {
        // Find the last valid number, starting from 4
        for (let i = range.length - 1; i >= 0; i--) {
          if (counts[range[i]] < maxOccurrences) {
            next = range[i]
            break
          }
        }
      }

      return next
    } else {
      let availableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
        num => !data.includes(num)
      )
      if (availableNums.length === 0) {
        availableNums = [1]
      }
      console.log(availableNums)
      if (smaller) {
        for (let i = availableNums.length - 1; i >= 0; i--) {
          if (availableNums[i] < currentNum) return availableNums[i]
        }

        return availableNums[availableNums.length - 1]
      } else {
        for (let num of availableNums) {
          if (num > currentNum) return num
        }

        return availableNums[0]
      }
    }
  }

  const puzzle = useMemo(() => generateRandomArray(), [flag, gameType])

  const handleButtonPress = async (i, j, key) => {
    if (gameType === 'circles' && puzzle[i][j] !== 0) {
      return
    }
    if (num >= 0 && num <= 9) {
      const updatedPuzzle = [...puzzleData]
      updatedPuzzle[i] = [...updatedPuzzle[i]]
      if (num === updatedPuzzle[i][j] && gameType !== 'circles') {
        updatedPuzzle[i][j] = 0
      } else {
        updatedPuzzle[i][j] = num
        const n = getNextNum({ data: updatedPuzzle, currentNum: num })
        console.log({ n })
        setPuzzleData(updatedPuzzle)
        setNum(n)
      }

      //   console.log({ updatedPuzzle })
      if (isNotZeroArray(updatedPuzzle)) {
        if (
          checkForConflicts({
            gameType,
            puzzleData: updatedPuzzle,
            hor,
            ver,
            isMini: true
          }) === 1
        ) {
          await handleUpdateFinish()
        } else {
          setIsGameDisabled(true)
          setTimeout(() => {
            setPuzzleData(empty)
            setNum(1)
            setIsGameDisabled(false)
          }, 1000)
        }
      }
    }
  }

  const handleUpdateFinish = async () => {
    try {
      setIsGameCorrect(1)
      setTimeout(() => {
        setPuzzleData(empty)
        setFlag(!flag)
        setIsGameCorrect(0)
      }, 2000)
    } catch (error) {
      console.error('Error updating data:', error.message)
    }
  }

  const [cells, signsHr, signsVr, hor, ver] = useMemo(
    () => boardGen(puzzle, colors, gameType, null, true),
    [puzzle, colors, gameType]
  )

  const handleMouseEnter = () => {
    // console.log('handleMouseEnter')
    if (!isMobile) {
      disableScroll()
    }
  }

  const handleMouseLeave = () => {
    // console.log('handleMouseLeave')
    if (!isMobile) {
      enableScroll()
    }
  }

  const numbers = useMemo(() => {
    if (gameType === 'circles') {
      return
    }
    const generatedNumbers = []

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const key = `${i}-${j}`

        const isConflict =
          puzzleData[i][j] !== 0 &&
          checkConflict({
            i,
            j,
            value: puzzleData[i][j],
            puzzleData,
            hor,
            ver,
            gameType,
            isMini: true
          })
        generatedNumbers.push(
          <Button
            onClick={() => handleButtonPress(i, j, key)}
            bg={isConflict ? 'red.400' : 'transparent'}
            borderRadius='lg'
            borderColor='rgba(255, 255, 255, 0.01)'
            borderWidth='10px'
            height='33.3%'
            width='33.3%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            color={isGameCorrect === 1 ? 'lightgreen' : colors.text}
            fontWeight={isGameCorrect === 1 ? 'bold' : 'normal'}
            fontSize={isGameCorrect === 1 ? '25px' : '20px'}
            onWheel={handleWheel}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            cursor={`url(${generateCursorSVG(num)}) 16 16, auto`}
            disabled={isGameDisabled}
          >
            <Text>
              {puzzleData[i][j] !== 0 ? puzzleData[i][j].toString() : ''}
            </Text>
          </Button>
        )
        //   <SudokuNumber
        //     key={key}
        //     title={puzzleData[i][j]}
        //     onPress={() => handleButtonPress(i, j, key)}
        //     borderColor={'transparent'}
        //     i={i}
        //     j={j}
        //     isGameCorrect={isGameCorrect}
        //     colors={colors}
        //     hor={hor}
        //     ver={ver}
        //     puzzleData={puzzleData}
        //     onWheel={handleWheel}
        //     onMouseEnter={handleMouseEnter}
        //     onMouseLeave={handleMouseLeave}
        //     generateCursorSVG={generateCursorSVG}
        //     num={num}
        //     isGameDisabled={isGameDisabled}
        //   />
      }
    }

    // console.log('Generated numbers array')
    return generatedNumbers
  }, [puzzleData, isGameDisabled, num, gameType])

  return (
    <>
      {gameType === 'circles' ? (
        <SudokuCirclesNumbers
          handleButtonPress={handleButtonPress}
          queue={[]}
          currentIndex={0}
          // checkConflict={checkConflict}
          puzzleData={puzzleData}
          puzzle={puzzle}
          num={num}
          isMini={true}
          onWheel={handleWheel}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={isGameDisabled}
          isGameCorrect={isGameCorrect}
        />
      ) : (
        <Box
          position='relative'
          display='flex'
          flexWrap='wrap'
          bg='white'
          height='100%'
          width='100%'
          //   cursor={`url(${generateCursorSVG(num)}), auto`}
          //   onWheel={handleWheel}
          //   onMouseEnter={handleMouseEnter}
          //   onMouseLeave={handleMouseLeave}
        >
          {cells}
          <Box
            position='absolute'
            width='100%'
            height='100%'
            display='flex'
            flexWrap='wrap'
            top='10%'
            left='3%'
            //   bg='red'
          >
            {signsHr}
          </Box>
          <Box
            position='absolute'
            width='100%'
            height='100%'
            display='flex'
            flexWrap='wrap'
            top='2.5%'
            left='10%'
            //   bg='yellow'
          >
            {signsVr}
          </Box>
          <Box
            position='absolute'
            width='100%'
            height='100%'
            display='flex'
            flexWrap='wrap'
            //   bg='green'
          >
            {numbers}
          </Box>
        </Box>
      )}
    </>
  )
}

export default MiniGame

const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

function preventDefault (e) {
  e.preventDefault()
}

function preventDefaultForScrollKeys (e) {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}

const supportsPassive = (() => {
  let passiveSupported = false
  try {
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get: function () {
          passiveSupported = true
        }
      })
    )
  } catch (e) {}
  return passiveSupported
})()

const wheelOpt = supportsPassive ? { passive: false } : false
const wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'

function disableScroll () {
  window.addEventListener('DOMMouseScroll', preventDefault, false) // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt) // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false)
}

function enableScroll () {
  window.removeEventListener('DOMMouseScroll', preventDefault, false)
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
  window.removeEventListener('touchmove', preventDefault, wheelOpt)
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false)
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function removeRandomElements (array, n) {
  const flatArray = array.flat()
  const length = flatArray.length

  for (let i = 0; i < n; i++) {
    let randomIndex = Math.floor(Math.random() * length)

    while (flatArray[randomIndex] === 0) {
      randomIndex = Math.floor(Math.random() * length)
    }

    flatArray[randomIndex] = 0
  }
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      array[i][j] = flatArray[i * 4 + j]
    }
  }
}

function solveSudoku2 (grid, numbers) {
  const emptyCell = findEmptyCell2(grid)

  if (!emptyCell) {
    return true
  }

  const [row, col] = emptyCell

  for (let num = 0; num < 4; num++) {
    if (isValidMove2(grid, row, col, numbers[num])) {
      grid[row][col] = numbers[num]

      if (solveSudoku2(grid, numbers)) {
        return true
      }

      grid[row][col] = 0
    }
  }

  return false
}

function findEmptyCell2 (grid) {
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        return [i, j]
      }
    }
  }
  return null
}

const isValidMove2 = (grid, row, col, num) => {
  return (
    !isInRow2(grid, row, num) &&
    !isInColumn2(grid, col, num) &&
    !isInSubgrid2(grid, col, num)
  )
}

function isInRow2 (grid, row, num) {
  return grid[row].includes(num)
}

function isInColumn2 (grid, col, num) {
  return grid.some(row => row[col] === num)
}

function isInSubgrid2 (grid, col, num) {
  let r = col < 2 ? col + 2 : col - 2
  return grid.some(row => row[r] === num)
}

const fillSubgrid2 = grid => {
  const numbers = shuffleArray([1, 2, 3, 4])
  for (let i = 0; i < 4; i++) {
    grid[0][i] = numbers[i]
  }
}