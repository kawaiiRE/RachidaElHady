import React, { useState, useMemo, useEffect } from 'react'
import { Box, Text, Button, VStack, HStack, useTheme } from '@chakra-ui/react'
import { isNotZeroArray } from '../functions'
import { useColorMode } from '../../../components/ui/color-mode'

const empty = Array.from({ length: 3 }, () => Array(3).fill(0))

function MiniGame ({ gameType }) {
  const { colors, fonts } = useColorMode()
  const [puzzleData, setPuzzleData] = useState(empty)
  const [num, setNum] = useState(1)
  const [flag, setFlag] = useState(false) // flag to regenerate a new Game
  const [isGameCorrect, setIsGameCorrect] = useState(0)

  useEffect(() => {
    setPuzzleData(empty)
    setNum(1)
  }, [gameType])

  const generateRandomArray = () => {
    setPuzzleData(empty)
    setNum(1)
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    shuffleArray(numbers)

    const doubleArray = []
    for (let i = 0; i < 3; i++) {
      doubleArray.push(numbers.slice(i * 3, (i + 1) * 3))
    }
    return doubleArray
  }

  const puzzle = useMemo(() => generateRandomArray(), [flag, gameType])

  const handleButtonPress = async (i, j, key) => {
    if (num >= 0 && num <= 9) {
      const updatedPuzzle = [...puzzleData]
      updatedPuzzle[i] = [...updatedPuzzle[i]]
      if (num === updatedPuzzle[i][j]) {
        updatedPuzzle[i][j] = 0
      } else {
        let a = num
        if (numberExists(a, puzzleData)) {
          while (numberExists(a, puzzleData)) {
            a = a === 9 ? 1 : a + 1
          }
          setNum(a)
        }
        updatedPuzzle[i][j] = a
        setPuzzleData(updatedPuzzle)
        if (a === 9) {
          setNum(1)
        } else {
          setNum(a + 1)
        }
      }

      if (isNotZeroArray(updatedPuzzle)) {
        if (checkForConflicts(updatedPuzzle, hor, ver) === 1) {
          await handleUpdateFinish()
        } else {
          setTimeout(() => {
            setPuzzleData(empty)
          }, 1000)
        }
        setNum(1)
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
    () => boardGen(puzzle, colors),
    [puzzle, colors, gameType]
  )

  const numbers = []

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const key = `${i}-${j}`

      numbers.push(
        <SudokuNumber
          key={key}
          title={puzzleData[i][j]}
          onPress={() => handleButtonPress(i, j, key)}
          borderColor={'transparent'}
          i={i}
          j={j}
          isGameCorrect={isGameCorrect}
          colors={colors}
          hor={hor}
          ver={ver}
          puzzleData={puzzleData}
        />
      )
    }
  }

  return (
    <Box
      position='relative'
      display='flex'
      flexWrap='wrap'
      bg='white'
      height='100%'
      width='100%'
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
  )
}

export default MiniGame

const SudokuNumber = ({
  title,
  onPress,
  i,
  j,
  isGameCorrect,
  colors,
  hor,
  ver,
  puzzleData
}) => {
  const isConflict =
    title !== 0 && checkConflict(i, j, title, puzzleData, hor, ver)

  return (
    <Button
      onClick={onPress}
      bg={isConflict ? 'red.400' : 'transparent'}
      borderRadius='lg'
      borderColor='rgba(255, 255, 255, 0.01)'
      borderWidth='10px'
      height='33.2%'
      width='33.2%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      color={isGameCorrect === 1 ? 'lightgreen' : colors.text}
      fontWeight={isGameCorrect === 1 ? 'bold' : 'normal'}
      fontSize={isGameCorrect === 1 ? '25px' : '20px'}
    >
      <Text>{title !== 0 ? title.toString() : ''}</Text>
    </Button>
  )
}

const numberExists = (buttonKey, puzzleData) => {
  return puzzleData.some(row => row.some(number => number === buttonKey))
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const checkForConflicts = (updatedPuzzle, hor, ver) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (checkConflict(i, j, updatedPuzzle[i][j], updatedPuzzle, hor, ver)) {
        return
      }
    }
  }
  return 1
}

const checkConflict = (i, j, value, puzzleData, hor, ver) => {
  const isTopBorder = i % 3 === 0
  const isBottomBorder = i % 3 === 2
  const isLeftBorder = j % 3 === 0
  const isRightBorder = j % 3 === 2

  const checkSignRelationhr = (sign, value1, value2) => {
    if (sign === '<') {
      return value2 !== 0 && value1 > value2
    } else if (sign === '>') {
      return value2 !== 0 && value1 < value2
    }
  }
  const checkSignRelationvr = (sign, value1, value2) => {
    if (sign === '<') {
      return value2 !== 0 && value1 < value2
    } else if (sign === '>') {
      return value2 !== 0 && value1 > value2
    }
  }

  if (isLeftBorder) {
    if (checkSignRelationhr(hor[i][j], value, puzzleData[i][j + 1])) {
      return true
    }
  } else if (isRightBorder) {
    if (checkSignRelationvr(hor[i][j - 1], value, puzzleData[i][j - 1])) {
      return true
    }
  } else {
    if (checkSignRelationhr(hor[i][j], value, puzzleData[i][j + 1])) {
      return true
    }
    if (checkSignRelationvr(hor[i][j - 1], value, puzzleData[i][j - 1])) {
      return true
    }
  }

  if (isTopBorder) {
    if (checkSignRelationvr(ver[i][j], value, puzzleData[i + 1][j])) {
      return true
    }
  } else if (isBottomBorder) {
    if (checkSignRelationhr(ver[i - 1][j], value, puzzleData[i - 1][j])) {
      return true
    }
  } else {
    if (checkSignRelationvr(ver[i][j], value, puzzleData[i + 1][j])) {
      return true
    }
    if (checkSignRelationhr(ver[i - 1][j], value, puzzleData[i - 1][j])) {
      return true
    }
  }
  return false
}

const boardGen = (puzzle, colors) => {
  // console.log(JSON.stringify(puzzle));
  const cells = []
  const signsHr = []
  const signsVr = []
  const hor = Array.from({ length: 3 }, () => Array(3).fill(''))
  const ver = Array.from({ length: 3 }, () => Array(3).fill(''))
  const isMin = Array.from({ length: 3 }, () => Array(3).fill(false))
  const isMax = Array.from({ length: 3 }, () => Array(3).fill(false))

  const SudokuCell = ({ borderColor, i, j }) => {
    const isTopBorderThick = i % 3 === 0
    const isBottomBorderThick = i % 3 === 2
    const isLeftBorderThick = j % 3 === 0
    const isRightBorderThick = j % 3 === 2

    const thick = 1.5

    const cellValue = puzzle[i][j]

    let p1 = i + 1
    let p2 = i - 1
    let o1 = j + 1
    let o2 = j - 1

    if (i === 2 || i === 5) {
      p1 = 3
    } else if (i === 3 || i === 6) {
      p2 = -1
    }
    if (j === 2 || j === 5) {
      o1 = 3
    } else if (j === 3 || j === 6) {
      o2 = -1
    }

    const minAdjacentValue = Math.min(
      puzzle[i][j],
      puzzle[p1]?.[j] || 3,
      puzzle[p2]?.[j] || 3,
      puzzle[i]?.[o1] || 3,
      puzzle[i]?.[o2] || 3
    )
    const maxAdjacentValue = Math.max(
      puzzle[i][j],
      puzzle[p1]?.[j] || 0,
      puzzle[p2]?.[j] || 0,
      puzzle[i]?.[o1] || 0,
      puzzle[i]?.[o2] || 0
    )

    let cellColor = colors.onPrimary

    if (cellValue === minAdjacentValue) {
      isMin[i][j] = true
      cellColor = '#61c5ff'
    } else if (cellValue === maxAdjacentValue) {
      isMax[i][j] = true
      cellColor = '#ff78a5'
    }

    return (
      <Box
        style={{
          ...styles.cell,
          borderTopWidth: isTopBorderThick ? thick : 0.5,
          borderBottomWidth: isBottomBorderThick ? thick : 0.5,
          borderLeftWidth: isLeftBorderThick ? thick : 0.5,
          borderRightWidth: isRightBorderThick ? thick : 0.5,
          borderColor,
          backgroundColor: cellColor
        }}
      />
    )
  }

  const SudokuSign = ({ title, tex, i, j }) => {
    console.log(tex)
    return (
      <Box style={styles.squareView}>
        <Text
          style={
           { ...tex }
         }
        >
          {title}
        </Text>
      </Box>
    )
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const key = `${i}-${j}`
      const isTopBorder = i % 3 === 0
      const isBottomBorder = i % 3 === 2
      const isLeftBorder = j % 3 === 0
      const isRightBorder = j % 3 === 2
      if (isLeftBorder) {
        if (puzzle[i][j] > puzzle[i][j + 1]) {
          hor[i][j] = '>'
        } else if (puzzle[i][j] < puzzle[i][j + 1]) {
          hor[i][j] = '<'
        } else {
          hor[i][j] = ''
        }
      } else if (isRightBorder) {
        // }
      } else {
        if (puzzle[i][j] > puzzle[i][j + 1]) {
          hor[i][j] = '>'
        } else if (puzzle[i][j] < puzzle[i][j + 1]) {
          hor[i][j] = '<'
        } else {
          hor[i][j] = ''
        }
      }

      if (isTopBorder) {
        if (puzzle[i][j] > puzzle[i + 1][j]) {
          ver[i][j] = '<'
        } else if (puzzle[i][j] < puzzle[i + 1][j]) {
          ver[i][j] = '>'
        } else {
          ver[i][j] = ''
        }
      } else if (isBottomBorder) {
        // }
      } else {
        if (puzzle[i][j] > puzzle[i + 1][j]) {
          ver[i][j] = '<'
        } else if (puzzle[i][j] < puzzle[i + 1][j]) {
          ver[i][j] = '>'
        } else {
          ver[i][j] = ''
        }
      }
      cells.push(
        <SudokuCell
          key={key}
          title={puzzle[i][j]}
          borderColor={colors.text}
          i={i}
          j={j}
        />
      )
      signsHr.push(
        <SudokuSign
          key={key}
          title={hor[i][j]}
          borderColor={colors.text}
          tex={{ ...styles.text, color: colors.primary }}
          i={i}
          j={j}
        />
      )
      signsVr.push(
        <SudokuSign
          key={key}
          title={ver[i][j]}
          borderColor={colors.text}
          tex={{ ...styles.text2, color: colors.primary }}
          i={i}
          j={j}
        />
      )
    }
  }

  return [cells, signsHr, signsVr, hor, ver, isMin, isMax]
}

const styles ={
    boardContainer: {
      // top: 20,
      position: 'relative',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    signsContainer: {
      width: '100%',
      position: 'absolute',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    signsContainer2: {
      width: '100%',
      position: 'absolute',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    text: {
      width: '100%',
      height: '100%',
      aspectRatio: 1,
      top: 0,
      left: 5,
      color: 'red',
      textAlignVertical: 'center',
      textAlign: 'right',
      fontSize: 20
    },
    squareView: {
        position:'relative',
      width: '33.2%',
      height: '33.2%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text2: {
      top: 5,
      right: 1,
      width: '100%',
      height: '100%',
      aspectRatio: 1,
      color: 'red',
      transform: "rotate(-90deg)",
      fontSize: 20,
      textAlignVertical: 'center',
      textAlign: 'left'
    },
    cell: {
      width: '33.2%',
      height: '33.2%',
      aspectRatio: 1,
      borderRadius: 3,
    //   height: '100%'
    }
  }