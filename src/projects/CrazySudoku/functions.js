import { Box, Text } from '@chakra-ui/react'

export const isNotZeroArray = nestedArray => {
  // console.log(nestedArray)
  const a = nestedArray.every(innerArray =>
    innerArray.every(element => element !== 0)
  )
  // console.log({ a })
  return a
}

export const countOcc = (buttonKey, puzzleData) => {
  return puzzleData
    ? puzzleData.reduce(
        (count, row) =>
          count +
          row.reduce(
            (rowCount, number) =>
              number === buttonKey ? rowCount + 1 : rowCount,
            0
          ),
        0
      )
    : null
}

export const generateCursorSVG = num => {
  // SVG for the circular cursor with the number inside
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <circle cx="16" cy="16" r="15" fill="white" stroke="blue" stroke-width="1"  />
      <text x="16" y="18" fill="black" font-size="20" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${num}</text>
    </svg>`

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

const checkSignRelationhrForDivision = (sign, value1, value2) => {
  if (typeof value1 !== 'number' || typeof value2 !== 'number') {
    return false
  }
  // console.log('checkSignRelationhr')
  // console.log(sign)
  // console.log(value1)
  // console.log(value2)
  if (sign === '⊂') {
    return value2 !== 0 && value2 % value1 !== 0
  } else if (sign === '⊃') {
    return value2 !== 0 && value1 % value2 !== 0
  } else if (sign === '<') {
    return value2 !== 0 && value1 > value2
  } else if (sign === '>') {
    return value2 !== 0 && value1 < value2
  } else if (sign === '') {
    return (
      value2 !== 0 &&
      value1 !== 0 &&
      (value1 % value2 === 0 || value2 % value1 === 0)
    )
  }
}
const checkSignRelationvrForDivision = (sign, value1, value2) => {
  // console.log('checkSignRelationvr')
  // console.log(sign)
  // console.log(value1)
  // console.log(value2)
  if (typeof value1 !== 'number' || typeof value2 !== 'number') {
    return false
  }
  if (sign === '⊂') {
    return value2 !== 0 && value1 % value2 !== 0
  } else if (sign === '⊃') {
    return value2 !== 0 && value2 % value1 !== 0
  } else if (sign === '<') {
    return value2 !== 0 && value1 < value2
  } else if (sign === '>') {
    return value2 !== 0 && value1 > value2
  } else if (sign === '') {
    return (
      value2 !== 0 &&
      value1 !== 0 &&
      (value1 % value2 === 0 || value2 % value1 === 0)
    )
  }
}

const checkSignRelationhrForGreaterThan = (sign, value1, value2) => {
  if (typeof value1 !== 'number' || typeof value2 !== 'number') {
    return false
  }
  if (sign === '<') {
    return value2 !== 0 && value1 > value2
  } else if (sign === '>') {
    return value2 !== 0 && value1 < value2
  }
}
const checkSignRelationvrForGreaterThan = (sign, value1, value2) => {
  if (typeof value1 !== 'number' || typeof value2 !== 'number') {
    return false
  }
  if (sign === '<') {
    return value2 !== 0 && value1 < value2
  } else if (sign === '>') {
    return value2 !== 0 && value1 > value2
  }
}

export const checkConflict = ({
  i,
  j,
  value,
  puzzleData,
  hor,
  ver,
  differentValues,
  gameType,
  isMini
}) => {
  const arrLength = isMini ? 3 : 9
  // console.log({
  //   i,
  //   j,
  //   value,
  //   puzzleData,
  //   hor,
  //   ver,
  //   differentValues,
  //   gameType,
  //   arrLength
  // })
  if (differentValues && differentValues.length > 0) {
    for (const pair of differentValues) {
      if (pair[0] === i && pair[1] === j) {
        return true
      }
    }
    // return false
  }
  if (typeof value !== 'number') {
    return false
  }
  for (let col = 0; col < arrLength; col++) {
    if (col !== j && puzzleData[i][col] === value) {
      if (typeof puzzleData[i][col] !== 'number') {
        return false
      }
      return true
    }
  }
  for (let rowi = 0; rowi < arrLength; rowi++) {
    // console.log({ rowi, j }, puzzleData[rowi], puzzleData[rowi][j])
    if (rowi !== i && puzzleData[rowi][j] === value && value !== ' ') {
      if (typeof puzzleData[rowi][j] !== 'number') {
        return false
      }
      return true
    }
  }

  const startRow = Math.floor(i / 3) * 3
  const startColumn = Math.floor(j / 3) * 3

  for (let blockRow = startRow; blockRow < startRow + 3; blockRow++) {
    for (
      let blockColumn = startColumn;
      blockColumn < startColumn + 3;
      blockColumn++
    ) {
      if (
        (blockRow !== i || blockColumn !== j) &&
        puzzleData[blockRow][blockColumn] === value &&
        value !== ' '
      ) {
        return true
      }
    }
  }

  const isTopBorder = i % 3 === 0
  const isBottomBorder = i % 3 === 2
  const isLeftBorder = j % 3 === 0
  const isRightBorder = j % 3 === 2

  const checkSignRelationhr = (sign, value1, value2) => {
    switch (gameType) {
      case 'greaterThan':
        return checkSignRelationhrForGreaterThan(sign, value1, value2)
      case 'division':
        return checkSignRelationhrForDivision(sign, value1, value2)
      default:
        break
    }
  }
  const checkSignRelationvr = (sign, value1, value2) => {
    switch (gameType) {
      case 'greaterThan':
        return checkSignRelationvrForGreaterThan(sign, value1, value2)
      case 'division':
        return checkSignRelationvrForDivision(sign, value1, value2)
      default:
        break
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
    // console.log('i ', i, ' j ', j, ' value ', value, ' ver[i][j] ', ver[i][j], ' ver[i-1][j] ', ver[i-1][j])
    if (checkSignRelationvr(ver[i][j], value, puzzleData[i + 1][j])) {
      return true
    }
    if (checkSignRelationhr(ver[i - 1][j], value, puzzleData[i - 1][j])) {
      return true
    }
  }
  return false
}

const convertTo2By4Array = flatArray => {
  flatArray = flatArray.flat()
  const grid = []

  for (let i = 0; i < 2; i++) {
    const row = flatArray.slice(i * 4, (i + 1) * 4)
    grid.push(row)
  }

  return grid
}

export const checkConflictForCircles = (i, j, value, puzzleData, isMini) => {
  const arrLength = isMini ? [4, 2] : [8, 4]

  for (let col = 0; col < arrLength[0]; col++) {
    if (col !== j && puzzleData[i][col] === value) {
      return true
    }
  }
  for (let rowi = 0; rowi < arrLength[1]; rowi++) {
    if (rowi !== i && puzzleData[rowi][j] === value) {
      return true
    }
  }
  let r = j < arrLength[1] ? j + arrLength[1] : j - arrLength[1]

  for (let rowi = 0; rowi < arrLength[1]; rowi++) {
    if (puzzleData[rowi][r] === value) {
      return true
    }
  }

  return false
}

export const checkForConflicts = ({
  gameType,
  puzzleData,
  isMini,
  hor,
  ver,
  differentValues
}) => {
  if (gameType === 'circles') {
    const arrLength = isMini ? [2, 4] : [4, 8]

    for (let i = 0; i < arrLength[0]; i++) {
      for (let j = 0; j < arrLength[1]; j++) {
        if (
          checkConflictForCircles(i, j, puzzleData[i][j], puzzleData, isMini)
        ) {
          // console.log('Conflict Found.')
          return
        }
      }
    }
  } else {
    const arrLength = isMini ? 3 : 9
    for (let i = 0; i < arrLength; i++) {
      for (let j = 0; j < arrLength; j++) {
        if (
          puzzleData[i][j] !== 99 &&
          checkConflict({
            i,
            j,
            value: puzzleData[i][j],
            puzzleData,
            hor,
            ver,
            differentValues,
            gameType,
            isMini
          })
        ) {
          return
        }
      }
    }
  }
  return 1
}

// Generates the Sudoku board based on the selected game type (greater than or division)
export const boardGen = (puzzle, colors, gameType, difficulty, isMini) => {
  // console.log({ puzzle, colors, gameType, difficulty, isMini })
  const arrLength = isMini ? 3 : 9
  switch (gameType) {
    case 'greaterThan':
      return boardGenForGreaterThan(puzzle, colors, arrLength)
    case 'division':
      return boardGenForDivision(puzzle, colors, difficulty, arrLength)
    case 'circles':
      return []
    default:
      break
  }
}

const boardGenForGreaterThan = (puzzle, colors, arrLength) => {
  const cells = [] // Stores the Sudoku cells
  const signsHr = [] // Stores the horizontal greater-than/less-than signs
  const signsVr = [] // Stores the vertical greater-than/less-than signs
  const hor = Array.from({ length: arrLength }, () => Array(arrLength).fill('')) // 2D array for horizontal signs
  const ver = Array.from({ length: arrLength }, () => Array(arrLength).fill('')) // 2D array for vertical signs

  // Defines the SudokuCell component which styles and renders each cell
  const SudokuCell = ({ borderColor, i, j }) => {
    // Determines whether each side of the cell has a thick border based on its position
    const isTopBorderThick = i % 3 === 0
    const isBottomBorderThick = i % 3 === 2
    const isLeftBorderThick = j % 3 === 0
    const isRightBorderThick = j % 3 === 2

    const thick = 1.5 // Sets the thickness for thick borders

    const cellValue = puzzle[i][j] // Value in the current cell

    // Get adjacent cell indices, ensuring boundary conditions for 3x3 blocks
    let nextRow = i + 1
    let previousRow = i - 1
    let nextColumn = j + 1
    let previousColumn = j - 1

    // Handle boundaries within the 3x3 grid blocks
    if (i === 2 || i === 5) {
      nextRow = arrLength
    } else if (i === 3 || i === 6) {
      previousRow = -1
    }
    if (j === 2 || j === 5) {
      nextColumn = arrLength
    } else if (j === 3 || j === 6) {
      previousColumn = -1
    }

    // Determine the minimum and maximum values from adjacent cells
    const minAdjacentValue = Math.min(
      puzzle[i][j],
      puzzle[nextRow]?.[j] || arrLength,
      puzzle[previousRow]?.[j] || arrLength,
      puzzle[i]?.[nextColumn] || arrLength,
      puzzle[i]?.[previousColumn] || arrLength
    )
    const maxAdjacentValue = Math.max(
      puzzle[i][j],
      puzzle[nextRow]?.[j] || 0,
      puzzle[previousRow]?.[j] || 0,
      puzzle[i]?.[nextColumn] || 0,
      puzzle[i]?.[previousColumn] || 0
    )

    // Set the cell color based on whether it contains the minimum or maximum adjacent value
    let cellColor = colors.onPrimary

    if (cellValue === minAdjacentValue) {
      cellColor = '#61c5ff' // Blue if it's the minimum value
    } else if (cellValue === maxAdjacentValue) {
      cellColor = '#ff78a5' // Red if it's the maximum value
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
          width: arrLength === 3 ? '33.3%' : '11.1%',
          height: arrLength === 3 ? '33.3%' : '11.1%',
          backgroundColor: cellColor
        }}
      />
    )
  }

  // Loop through the 9x9 puzzle grid
  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength; j++) {
      const key = `${i}-${j}` // Generate a unique key for each cell

      // Add horizontal signs based on comparison between adjacent cells
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
          signStyle={{
            ...styles.signsHrStyles,
            color: colors.primary,
            width: '99%',
            left: 5
          }}
          i={i}
          j={j}
          isMini={arrLength === 3}
        />
      )
      signsVr.push(
        <SudokuSign
          key={key}
          title={ver[i][j]}
          borderColor={colors.text}
          signStyle={{
            ...styles.signsVrStyles,
            color: colors.primary,
            top: 5,
            right: 1
          }}
          i={i}
          j={j}
          isMini={arrLength === 3}
        />
      )
    }
  }
  // console.log({ cells, signsHr, signsVr, hor, ver })
  return [cells, signsHr, signsVr, hor, ver]
}
// ⊂ ⊃
const boardGenForDivision = (puzzle, colors, difficulty, arrLength) => {
  const cells = []
  const signsHr = []
  const signsVr = []
  const hor = Array.from({ length: arrLength }, () => Array(arrLength).fill(''))
  const ver = Array.from({ length: arrLength }, () => Array(arrLength).fill(''))
  const SudokuCell = ({ borderColor, i, j }) => {
    const isTopBorderThick = i % 3 === 0
    const isBottomBorderThick = i % 3 === 2
    const isLeftBorderThick = j % 3 === 0
    const isRightBorderThick = j % 3 === 2

    const thick = 1.5

    return (
      <Box
        style={{
          ...styles.cell,
          borderTopWidth: isTopBorderThick ? thick : 0.5,
          borderBottomWidth: isBottomBorderThick ? thick : 0.5,
          borderLeftWidth: isLeftBorderThick ? thick : 0.5,
          borderRightWidth: isRightBorderThick ? thick : 0.5,
          width: arrLength === 3 ? '33.3%' : '11.1%',
          height: arrLength === 3 ? '33.3%' : '11.1%',
          borderColor
        }}
      />
    )
  }

  const checkSign = sign => {
    if (sign !== '⊂' && sign !== '⊃') {
      return true
    }
    return false
  }
  const checkNum = (i, j) => {
    if (difficulty === 'H' && puzzle[i][j] === 1) {
      // so that it doesnt always put a < or > sign when is hard
      return Math.random() < 0.5
    }
    return puzzle[i][j] === 1
  }
  //   ||checkNum(i,j)
  const checkTitle1 = sign => {
    if (sign === '⊂' || sign === '⊃') {
      return true
    }
    return false
  }
  const checkTitle2 = sign => {
    if (sign === '<' || sign === '>') {
      return true
    }
    return false
  }
  // ⊂ ⊃
  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength; j++) {
      const key = `${i}-${j}`
      const isTopBorder = i % 3 === 0
      const isBottomBorder = i % 3 === 2
      const isLeftBorder = j % 3 === 0
      const isRightBorder = j % 3 === 2
      if (isLeftBorder) {
        if (puzzle[i][j] % puzzle[i][j + 1] === 0) {
          hor[i][j] = '⊃'
        } else if (puzzle[i][j + 1] % puzzle[i][j] === 0) {
          hor[i][j] = '⊂'
        } else {
          hor[i][j] = ''
        }
      } else if (isRightBorder) {
        // }
      } else {
        if (puzzle[i][j] % puzzle[i][j + 1] === 0) {
          hor[i][j] = '⊃'
        } else if (puzzle[i][j + 1] % puzzle[i][j] === 0) {
          hor[i][j] = '⊂'
        } else {
          hor[i][j] = ''
        }
      }

      if (isTopBorder) {
        if (puzzle[i][j] % puzzle[i + 1][j] === 0) {
          ver[i][j] = '⊂'
        } else if (puzzle[i + 1][j] % puzzle[i][j] === 0) {
          ver[i][j] = '⊃'
        } else {
          ver[i][j] = ''
        }
      } else if (isBottomBorder) {
        // }
      } else {
        if (puzzle[i][j] % puzzle[i + 1][j] === 0) {
          ver[i][j] = '⊂'
        } else if (puzzle[i + 1][j] % puzzle[i][j] === 0) {
          ver[i][j] = '⊃'
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
    }
  }
  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength; j++) {
      const key = `${i}-${j}`
      const isTopBorder = i % 3 === 0
      const isBottomBorder = i % 3 === 2
      const isLeftBorder = j % 3 === 0
      const isRightBorder = j % 3 === 2
      if (isLeftBorder) {
        if (isTopBorder) {
          if (
            checkSign(hor[i][j]) &&
            (checkSign(hor[i][j + 1]) || checkNum(i, j + 2)) &&
            (checkSign(ver[i][j]) || checkNum(i + 1, j)) &&
            (checkSign(ver[i][j + 1]) || checkNum(i + 1, j + 1))
          ) {
            if (puzzle[i][j] > puzzle[i][j + 1]) {
              hor[i][j] = '>'
            } else if (puzzle[i][j] < puzzle[i][j + 1]) {
              hor[i][j] = '<'
            } else {
              hor[i][j] = ''
            }
          }
          if (
            (checkSign(hor[i][j]) || checkNum(i, j + 1)) &&
            (checkSign(hor[i + 1][j]) || checkNum(i + 1, j + 1)) &&
            checkSign(ver[i][j]) &&
            (checkSign(ver[i + 1][j]) || checkNum(i + 2, j))
          ) {
            if (puzzle[i][j] > puzzle[i + 1][j]) {
              ver[i][j] = '<'
            } else if (puzzle[i][j] < puzzle[i + 1][j]) {
              ver[i][j] = '>'
            } else {
              hor[i][j] = ''
            }
          }
        } else if (isBottomBorder) {
          if (
            checkSign(hor[i][j]) &&
            (checkSign(hor[i][j + 1]) || checkNum(i, j + 2)) &&
            (checkSign(ver[i - 1][j]) || checkNum(i - 1, j)) &&
            (checkSign(ver[i - 1][j + 1]) || checkNum(i - 1, j + 1))
          ) {
            if (puzzle[i][j] > puzzle[i][j + 1]) {
              hor[i][j] = '>'
            } else if (puzzle[i][j] < puzzle[i][j + 1]) {
              hor[i][j] = '<'
            } else {
              hor[i][j] = ''
            }
          }
          if (
            (checkSign(hor[i][j]) || checkNum(i, j + 1)) &&
            (checkSign(hor[i - 1][j]) || checkNum(i - 1, j + 1)) &&
            checkSign(ver[i - 1][j]) &&
            (checkSign(ver[i - 2][j]) || checkNum(i - 2, j))
          ) {
            if (puzzle[i - 1][j] > puzzle[i][j]) {
              ver[i - 1][j] = '<'
            } else if (puzzle[i - 1][j] < puzzle[i][j]) {
              ver[i - 1][j] = '>'
            } else {
              ver[i - 1][j] = ''
            }
          }
        } else {
          if (
            checkSign(hor[i][j]) &&
            (checkSign(hor[i][j + 1]) || checkNum(i, j + 2)) &&
            (checkSign(ver[i][j]) || checkNum(i + 1, j)) &&
            (checkSign(ver[i][j + 1]) || checkNum(i + 1, j + 1)) &&
            (checkSign(ver[i - 1][j + 1]) || checkNum(i - 1, j + 1)) &&
            (checkSign(ver[i - 1][j]) || checkNum(i - 1, j))
          ) {
            if (puzzle[i][j] > puzzle[i][j + 1]) {
              hor[i][j] = '>'
            } else if (puzzle[i][j] < puzzle[i][j + 1]) {
              hor[i][j] = '<'
            } else {
              hor[i][j] = ''
            }
          }
        }
      } else if (isRightBorder) {
        if (isTopBorder) {
          if (
            checkSign(hor[i][j - 1]) &&
            (checkSign(hor[i][j - 2]) || checkNum(i, j - 2)) &&
            (checkSign(ver[i][j]) || checkNum(i + 1, j)) &&
            (checkSign(ver[i][j - 1]) || checkNum(i + 1, j - 1))
          ) {
            if (puzzle[i][j - 1] > puzzle[i][j]) {
              hor[i][j - 1] = '>'
            } else if (puzzle[i][j - 1] < puzzle[i][j]) {
              hor[i][j - 1] = '<'
            } else {
              hor[i][j - 1] = ''
            }
          }
          if (
            (checkSign(hor[i][j - 1]) || checkNum(i, j - 1)) &&
            (checkSign(hor[i + 1][j - 1]) || checkNum(i + 1, j - 1)) &&
            checkSign(ver[i][j]) &&
            (checkSign(ver[i + 1][j]) || checkNum(i + 2, j))
          ) {
            if (puzzle[i][j] > puzzle[i + 1][j]) {
              ver[i][j] = '<'
            } else if (puzzle[i][j] < puzzle[i + 1][j]) {
              ver[i][j] = '>'
            } else {
              ver[i][j] = ''
            }
          }
        } else if (isBottomBorder) {
          if (
            checkSign(hor[i][j - 1]) &&
            (checkSign(hor[i][j - 2]) || checkNum(i, j - 2)) &&
            (checkSign(ver[i - 1][j]) || checkNum(i - 1, j)) &&
            (checkSign(ver[i - 1][j - 1]) || checkNum(i - 1, j - 1))
          ) {
            if (puzzle[i][j - 1] > puzzle[i][j]) {
              hor[i][j - 1] = '>'
            } else if (puzzle[i][j - 1] < puzzle[i][j]) {
              hor[i][j - 1] = '<'
            } else {
              hor[i][j - 1] = ''
            }
          }
          if (
            (checkSign(hor[i][j - 1]) || checkNum(i, j - 1)) &&
            (checkSign(hor[i - 1][j - 1]) || checkNum(i - 1, j - 1)) &&
            checkSign(ver[i - 1][j]) &&
            (checkSign(ver[i - 2][j]) || checkNum(i - 2, j))
          ) {
            if (puzzle[i - 1][j] > puzzle[i][j]) {
              ver[i - 1][j] = '<'
            } else if (puzzle[i - 1][j] < puzzle[i][j]) {
              ver[i - 1][j] = '>'
            } else {
              ver[i - 1][j] = ''
            }
          }
        } else {
          if (
            checkSign(hor[i][j - 1]) &&
            (checkSign(hor[i][j - 2]) || checkNum(i, j - 2)) &&
            (checkSign(ver[i][j]) || checkNum(i + 1, j)) &&
            (checkSign(ver[i - 1][j]) || checkNum(i - 1, j)) &&
            (checkSign(ver[i][j - 1]) || checkNum(i + 1, j - 1)) &&
            (checkSign(ver[i - 1][j - 1]) || checkNum(i - 1, j - 1))
          ) {
            if (puzzle[i][j - 1] > puzzle[i][j]) {
              hor[i][j - 1] = '>'
            } else if (puzzle[i][j - 1] < puzzle[i][j]) {
              hor[i][j - 1] = '<'
            } else {
              hor[i][j - 1] = ''
            }
          }
        }
      } else {
        if (isTopBorder) {
          // hi
        } else if (isBottomBorder) {
          // hi
        } else {
          if (
            (checkSign(hor[i][j - 1]) || checkNum(i, j - 1)) &&
            (checkSign(hor[i][j]) || checkNum(i, j + 1)) &&
            (checkSign(ver[i - 1][j]) || checkNum(i - 1, j)) &&
            (checkSign(ver[i][j]) || checkNum(i + 1, j))
          ) {
            if (
              (checkSign(hor[i - 1][j - 1]) || checkNum(i - 1, j - 1)) &&
              (checkSign(hor[i - 1][j]) || checkNum(i - 1, j + 1)) &&
              checkSign(ver[i - 1][j])
            ) {
              if (puzzle[i - 1][j] > puzzle[i][j]) {
                ver[i - 1][j] = '<'
              } else if (puzzle[i - 1][j] < puzzle[i][j]) {
                ver[i - 1][j] = '>'
              } else {
                ver[i - 1][j] = ''
              }
            }
            if (
              (checkSign(hor[i + 1][j - 1]) || checkNum(i + 1, j - 1)) &&
              (checkSign(hor[i + 1][j]) || checkNum(i + 1, j + 1)) &&
              checkSign(ver[i][j])
            ) {
              if (puzzle[i][j] > puzzle[i + 1][j]) {
                ver[i][j] = '<'
              } else if (puzzle[i][j] < puzzle[i + 1][j]) {
                ver[i][j] = '>'
              } else {
                ver[i][j] = ''
              }
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength; j++) {
      const key = `${i}-${j}`
      signsHr.push(
        <SudokuSign
          key={key}
          title={hor[i][j]}
          borderColor={colors.text}
          signStyle={{
            ...styles.signsHrStyles,
            left: checkTitle1(hor[i][j]) ? 7 : 5,
            color: colors.primary,
            width: '99.5%'
          }}
          i={i}
          j={j}
          isMini={arrLength === 3}
        />
      )
      signsVr.push(
        <SudokuSign
          key={key}
          title={ver[i][j]}
          borderColor={colors.text}
          signStyle={{
            ...styles.signsVrStyles,
            top: checkTitle1(ver[i][j]) ? 7 : 5,
            right: checkTitle2(ver[i][j]) ? 1 : 0,
            color: colors.primary
          }}
          i={i}
          j={j}
          isMini={arrLength === 3}
        />
      )
    }
  }
  // console.log('hor', JSON.stringify(hor))
  // console.log('ver', JSON.stringify(ver))
  // console.log('puzzle', JSON.stringify(puzzle))

  return [cells, signsHr, signsVr, hor, ver]
}

const SudokuSign = ({ title, signStyle, i, j, isMini }) => {
  return (
    <Box
      style={{
        ...styles.squareView,
        width: isMini ? '33.3%' : '11.1%',
        height: isMini ? '33.3%' : '11.1%'
      }}
    >
      <Text
        style={{
          ...signStyle
        }}
      >
        {title}
      </Text>
    </Box>
  )
}

const styles = {
  signsHrStyles: {
    aspectRatio: 1,
    top: 0,
    textAlignVertical: 'center',
    textAlign: 'right',
    fontSize: 20
  },
  squareView: {
    position: 'relative',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signsVrStyles: {
    top: 5,
    right: 1,
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    color: 'red',
    transform: 'rotate(-90deg)',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'left'
  },
  cell: {
    aspectRatio: 1,
    borderRadius: 3
  }
}
