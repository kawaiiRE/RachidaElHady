import React from 'react'
import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { checkConflictForCircles, generateCursorSVG } from './functions'

const doubleArray = Array.from({ length: 9 }, () => Array(9).fill(0))
const emptyCircles = Array.from({ length: 2 }, () => Array(4).fill(0))

export default function SudokuCirclesNumbers ({
  handleButtonPress,
  queue = [],
  currentIndex = 0,
  // checkConflict,
  puzzleData = emptyCircles,
  puzzle = emptyCircles,
  num,
  isMini = false,
  onWheel,
  onMouseEnter,
  onMouseLeave,
  disabled,
  isGameCorrect
}) {
  console.log({ puzzleData, puzzle, num })
  // const element = document.querySelector('#circlesWrapper')
  // console.log(element)

  // const boundingBox = element?.getBoundingClientRect()
  // const width = boundingBox?.width ?? 0

  // console.log('circles rerendering', { isGameCorrect })
  const [windowWidth, setWindowWidth] = useState(
    isMini ? window.innerWidth * 0.5 : window.innerWidth * 0.9
  )

  const handleResize = () => {
    const element = document.querySelector('#circlesWrapper')
    // console.log(element)
    if (element) {
      const boundingBox = element.getBoundingClientRect()
      const width = boundingBox.width
      // console.log({width})
      setWindowWidth(width)
    } else {
      setWindowWidth(isMini ? window.innerWidth * 0.5 : window.innerWidth * 0.9)
    }
  }

  useEffect(() => {
    handleResize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const radius = windowWidth / 2.1
  const px = windowWidth / 2 - radius
  const py = isMini ? windowWidth / 2 : 200
  const radius2 = isMini ? radius * 0.6 : radius * 0.8
  const px2 = windowWidth / 2 - radius2
  const py2 = isMini ? windowWidth / 2 : 200
  const radius3 = radius * 0.6
  const px3 = windowWidth / 2 - radius3
  const py3 = 200
  const radius4 = radius * 0.4
  const px4 = windowWidth / 2 - radius4
  const py4 = 200
  const radius5 = radius * 0.2
  const px5 = windowWidth / 2 - radius5
  const py5 = 200

  const renderCircle = (main, line, i, j) => {
    if (puzzleData.length < 1 || !puzzleData) {
      return null
    }
    const isMatch =
      puzzleData[i][j].toString() === num.toString() && puzzleData[i][j] !== 0
    const isConflict =
      puzzleData[i][j] !== 0 &&
      checkConflictForCircles(i, j, puzzleData[i][j], puzzleData, isMini)
    let isLast = false
    if (!isMini) {
      if (queue.length > 0 && currentIndex !== -1) {
        isLast =
          i === queue[currentIndex].i &&
          j === queue[currentIndex].j &&
          puzzleData[i][j] !== 0
      } else {
        isLast = false
      }
    }

    const fillColor =
      isLast && isConflict
        ? 'rgba(255, 100, 0, 0.9)' // reddish orange
        : isConflict
        ? 'red'
        : isGameCorrect === 1
        ? 'lightgreen'
        : isMatch
        ? 'rgba(255, 245, 120, 0.9)' // yellow
        : 'white'

    return (
      <g
        key={`${i}-${j}`}
        onWheel={onWheel}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={`url(${generateCursorSVG(num)}) 16 16, auto`}
        disabled={disabled}
      >
        <path
          d={main}
          fill={fillColor}
          stroke='black'
          onClick={() => {
            if (num === 0 && puzzleData[i][j] === 0) return
            if (num === 99 && puzzleData[i][j] === 0) return
            handleButtonPress(i, j, `${i}-${j}`)
          }}
        />
        <path id={`${i}-${j}`} d={line} />
        <text
          fontSize={puzzleData[i][j] === puzzle[i][j] ? '25' : '20'}
          fill={puzzleData[i][j] === puzzle[i][j] ? 'black' : 'blue'}
          fontWeight={puzzleData[i][j] === puzzle[i][j] ? 'bold' : 'normal'}
        >
          <textPath href={`#${i}-${j}`}>
            {puzzleData[i][j] === 0 ? '' : puzzleData[i][j]}
          </textPath>
        </text>
      </g>
    )
  }

  return (
    <Box
      as='svg'
      height={`${windowWidth + 50}px`}
      width='100%'
      id='circlesWrapper'
    >
      {isMini ? (
        <>
          {/* // 0 , 0 */}
          {renderCircle(
            `M${px} ${py} A${radius} ${radius} 0 0 1 ${px + radius} ${
              py - radius
            } L${px + radius} ${py} Z`,

            `M${px2} ${py2 - radius * 0.45} L${px2 + radius * 0.1} ${
              py2 - radius * 0.45
            }`,

            0,
            0
          )}

          {/* // 0 , 1 */}
          {renderCircle(
            `M${px + radius} ${py - radius} A${radius} ${radius} 0 0 1 ${
              px + radius * 2
            } ${py} L${px + radius} ${py} Z`,

            `M${px + radius * 1.5} ${py2 - radius * 0.45} L${
              px + radius * 1.6
            } ${py2 - radius * 0.45}`,

            0,
            1
          )}

          {/* // 0 , 2 */}
          {renderCircle(
            `M${px + radius * 2} ${py} A${radius} ${radius} 0 0 1 ${
              px + radius
            } ${py + radius} L${px + radius} ${py} Z`,

            `M${px + radius * 1.5} ${py2 + radius * 0.65} L${
              px + radius * 1.6
            } ${py2 + radius * 0.65}`,

            0,
            2
          )}

          {/* // 0 , 3 */}
          {renderCircle(
            `M${px + radius} ${
              py + radius
            }  A${radius} ${radius} 0 0 1 ${px} ${py} L${px + radius} ${py} Z`,

            `M${px2}  ${py2 + radius * 0.65} L${px2 + radius2 * 0.2}  ${
              py2 + radius * 0.65
            }`,

            0,
            3
          )}

          {/* // 1 , 0 */}
          {renderCircle(
            `M${px2} ${py2} A${radius2} ${radius2} 0 0 1 ${px2 + radius2} ${
              py2 - radius2
            } L${px2 + radius2} ${py2} Z`,

            `M${px2 + radius2 * 0.5} ${py2 - radius2 * 0.27} L${
              px2 + radius2 * 0.7
            } ${py2 - radius2 * 0.27}`,

            1,
            0
          )}

          {/* // 1 , 1 */}
          {renderCircle(
            `M${px2 + radius2} ${py2 - radius2}A${radius2} ${radius2} 0 0 1 ${
              px2 + radius2 * 2
            } ${py2} L${px2 + radius2} ${py2} Z`,

            `M${px2 + radius2 * 1.3} ${py2 - radius2 * 0.27} L${
              px2 + radius2 * 1.5
            }  ${py2 - radius2 * 0.27}`,

            1,
            1
          )}

          {/* // 1 , 2 */}
          {renderCircle(
            `M${px2 + radius2 * 2} ${py2} A${radius2} ${radius2} 0 0 1 ${
              px2 + radius2
            } ${py2 + radius2} L${px2 + radius2} ${py2} Z`,

            `M${px2 + radius2 * 1.3} ${py2 + radius2 * 0.6} L${
              px2 + radius2 * 1.5
            } ${py2 + radius2 * 0.6}`,

            1,
            2
          )}

          {/* // 1 , 3 */}
          {renderCircle(
            `M${px2 + radius2} ${
              py2 + radius2
            } A${radius2} ${radius2} 0 0 1 ${px2} ${py2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${px2 + radius2 * 0.5} ${py2 + radius2 * 0.6} L${
              px2 + radius2 * 0.7
            } ${py2 + radius2 * 0.6}`,

            1,
            3
          )}
        </>
      ) : (
        <>
          {/* // 0 , 0 */}
          {renderCircle(
            `M${px} ${py} A${radius} ${radius} 0 0 1 ${
              px + radius - Math.sin(Math.PI / 4) * radius
            } ${py - Math.cos(Math.PI / 4) * radius} L${px + radius} ${py} Z`,

            `M${px2 - radius * 0.08} ${py2 - radius * 0.3} L${px2} ${
              py2 - radius * 0.3
            }`,

            0,
            0
          )}

          {/* // 0 , 1 */}
          {renderCircle(
            `M${px + radius - Math.sin(Math.PI / 4) * radius} ${
              py - Math.cos(Math.PI / 4) * radius
            } A${radius} ${radius} 0 0 1 ${px + radius} ${py - radius} L${
              px + radius
            } ${py} Z`,
            `M${px2 + radius2 * 0.6 - radius * 0.08} ${py2 - radius2 * 0.98} L${
              px2 + radius2 * 0.6
            } ${py2 - radius2 * 0.98}`,

            0,
            1
          )}

          {/* // 0 , 2 */}
          {renderCircle(
            `M${px + radius} ${py - radius} A${radius} ${radius} 0 0 1 ${
              px + radius + Math.sin(Math.PI / 4) * radius
            } ${py - Math.cos(Math.PI / 4) * radius} L${px + radius} ${py} Z`,

            `M${px2 + radius2 * 1.4} ${py2 - radius2 * 0.98} L${
              px2 + radius2 * 1.4 + radius * 0.12
            } ${py2 - radius2 * 0.98}`,

            0,
            2
          )}

          {/* // 0 , 3 */}
          {renderCircle(
            `M${px + radius + Math.sin(Math.PI / 4) * radius} ${
              py - Math.cos(Math.PI / 4) * radius
            } A${radius} ${radius} 0 0 1 ${px + radius * 2} ${py} L${
              px + radius
            } ${py} Z`,

            `M${radius2 * 2 + px2} ${py2 - radius * 0.3} L${
              radius2 * 2 + px2 + radius * 0.08
            } ${py2 - radius * 0.3}`,

            0,
            3
          )}

          {/* // 0 , 4 */}
          {renderCircle(
            `M${px + radius * 2} ${py} A${radius} ${radius} 0 0 1 ${
              px + radius + Math.sin(Math.PI / 4) * radius
            } ${py + Math.cos(Math.PI / 4) * radius} L${px + radius} ${py} Z`,

            `M${radius2 * 2 + px2} ${py2 + radius * 0.39} L${
              radius2 * 2 + px2 + radius * 0.08
            } ${py2 + radius * 0.39}`,

            0,
            4
          )}

          {/* // 0 , 5 */}
          {renderCircle(
            `M${px + radius + Math.sin(Math.PI / 4) * radius} ${
              py + Math.cos(Math.PI / 4) * radius
            } A${radius} ${radius} 0 0 1 ${px + radius} ${py + radius} L${
              px + radius
            } ${py} Z`,

            `M${px2 + radius2 * 1.4} ${py2 + radius2 + radius * 0.08} L${
              px2 + radius2 * 1.4 + radius * 0.08
            } ${py2 + radius2 + radius * 0.08}`,

            0,
            5
          )}

          {/* // 0 , 6 */}
          {renderCircle(
            `M${px + radius} ${py + radius} A${radius} ${radius} 0 0 1 ${
              px + radius - Math.sin(Math.PI / 4) * radius
            } ${py + Math.cos(Math.PI / 4) * radius} L${px + radius} ${py} Z`,

            `M${px2 + radius2 * 0.6 - radius * 0.08} ${
              py2 + radius2 + radius * 0.08
            } L${px2 + radius2 * 0.6} ${py2 + radius2 + radius * 0.08}`,

            0,
            6
          )}

          {/* // 0 , 7 */}
          {renderCircle(
            `M${px + radius - Math.sin(Math.PI / 4) * radius} ${
              py + Math.cos(Math.PI / 4) * radius
            } A${radius} ${radius} 0 0 1 ${px} ${py} L${px + radius} ${py} Z`,
            `M${px2 - radius * 0.08} ${py2 + radius * 0.39} L${px2} ${
              py2 + radius * 0.39
            }`,

            0,
            7
          )}

          {/* // 1 , 0 */}
          {renderCircle(
            `M${px2} ${py2} A${radius2} ${radius2} 0 0 1 ${
              px2 + radius2 - Math.sin(Math.PI / 4) * radius2
            } ${py2 - Math.cos(Math.PI / 4) * radius2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${px3 - radius2 * 0.12} ${py3 - radius2 * 0.27} L${px3} ${
              py3 - radius2 * 0.27
            }`,

            1,
            0
          )}

          {/* // 1 , 1 */}
          {renderCircle(
            `M${px2 + radius2 - Math.sin(Math.PI / 4) * radius2} ${
              py2 - Math.cos(Math.PI / 4) * radius2
            } A${radius2} ${radius2} 0 0 1 ${px2 + radius2} ${py2 - radius2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${px3 + radius3 * 0.6 - radius2 * 0.09} ${py3 - radius3} L${
              px3 + radius3 * 0.6
            } ${py3 - radius3}`,

            1,
            1
          )}

          {/* // 1 , 2 */}
          {renderCircle(
            `M${px2 + radius2} ${py2 - radius2} A${radius2} ${radius2} 0 0 1 ${
              px2 + radius2 + Math.sin(Math.PI / 4) * radius2
            } ${py2 - Math.cos(Math.PI / 4) * radius2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${px3 + radius3 * 1.4} ${py3 - radius3} L${
              px3 + radius3 * 1.4 + radius2 * 0.08
            } ${py3 - radius3}`,

            1,
            2
          )}

          {/* // 1 , 3 */}
          {renderCircle(
            `M${px2 + radius2 + Math.sin(Math.PI / 4) * radius2} ${
              py2 - Math.cos(Math.PI / 4) * radius2
            } A${radius2} ${radius2} 0 0 1 ${px2 + radius2 * 2} ${py2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${radius3 * 2 + px3 + radius2 * 0.03} ${py3 - radius2 * 0.27} L${
              radius3 * 2 + px3 + radius2 * 0.12
            } ${py3 - radius2 * 0.27}`,

            1,
            3
          )}

          {/* // 1 , 4 */}
          {renderCircle(
            `M${px2 + radius2 * 2} ${py2} A${radius2} ${radius2} 0 0 1 ${
              px2 + radius2 + Math.sin(Math.PI / 4) * radius2
            } ${py2 + Math.cos(Math.PI / 4) * radius2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${radius3 * 2 + px3} ${py3 + radius2 * 0.39} L${
              radius3 * 2 + px3 + radius2 * 0.08
            } ${py3 + radius2 * 0.39}`,

            1,
            4
          )}

          {/* // 1 , 5 */}
          {renderCircle(
            `M${px2 + radius2 + Math.sin(Math.PI / 4) * radius2} ${
              py2 + Math.cos(Math.PI / 4) * radius2
            } A${radius2} ${radius2} 0 0 1 ${px2 + radius2} ${py2 + radius2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${px3 + radius3 * 1.4} ${py3 + radius3 + radius2 * 0.11} L${
              px3 + radius3 * 1.4 + radius2 * 0.08
            } ${py3 + radius3 + radius2 * 0.11}`,

            1,
            5
          )}

          {/* // 1 , 6 */}
          {renderCircle(
            `M${px2 + radius2} ${py2 + radius2} A${radius2} ${radius2} 0 0 1 ${
              px2 + radius2 - Math.sin(Math.PI / 4) * radius2
            } ${py2 + Math.cos(Math.PI / 4) * radius2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${px3 + radius3 * 0.6 - radius2 * 0.08} ${
              py3 + radius3 + radius2 * 0.13
            } L${px3 + radius3 * 0.6} ${py3 + radius3 + radius2 * 0.13}`,

            1,
            6
          )}

          {/* // 1 , 7 */}
          {renderCircle(
            `M${px2 + radius2 - Math.sin(Math.PI / 4) * radius2} ${
              py2 + Math.cos(Math.PI / 4) * radius2
            } A${radius2} ${radius2} 0 0 1 ${px2} ${py2} L${
              px2 + radius2
            } ${py2} Z`,

            `M${px3 - radius2 * 0.11} ${py3 + radius2 * 0.39} L${px3} ${
              py3 + radius2 * 0.39
            }`,

            1,
            7
          )}

          {/* // 2 , 0 */}
          {renderCircle(
            `M${px3} ${py3} A${radius3} ${radius3} 0 0 1 ${
              px3 + radius3 - Math.sin(Math.PI / 4) * radius3
            } ${py3 - Math.cos(Math.PI / 4) * radius3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${px4 - radius3 * 0.17} ${py4 - radius3 * 0.24} L${px4} ${
              py4 - radius3 * 0.24
            }`,

            2,
            0
          )}

          {/* // 2 , 1 */}
          {renderCircle(
            `M${px3 + radius3 - Math.sin(Math.PI / 4) * radius3} ${
              py3 - Math.cos(Math.PI / 4) * radius3
            } A${radius3} ${radius3} 0 0 1 ${px3 + radius3} ${py3 - radius3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${px4 + radius4 * 0.6 - radius3 * 0.11} ${
              py4 - radius4 * 1.02
            } L${px4 + radius4 * 0.6} ${py4 - radius4 * 1.02}`,

            2,
            1
          )}

          {/* // 2 , 2 */}
          {renderCircle(
            `M${px3 + radius3} ${py3 - radius3} A${radius3} ${radius3} 0 0 1 ${
              px3 + radius3 + Math.sin(Math.PI / 4) * radius3
            } ${py3 - Math.cos(Math.PI / 4) * radius3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${px4 + radius4 * 1.4} ${py4 - radius4 * 1.02} L${
              px4 + radius4 * 1.4 + radius3 * 0.11
            } ${py4 - radius4 * 1.02}`,

            2,
            2
          )}

          {/* // 2 , 3 */}
          {renderCircle(
            `M${px3 + radius3 + Math.sin(Math.PI / 4) * radius3} ${
              py3 - Math.cos(Math.PI / 4) * radius3
            } A${radius3} ${radius3} 0 0 1 ${px3 + radius3 * 2} ${py3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${radius4 * 2 + px4 + radius3 * 0.05} ${py4 - radius3 * 0.24} L${
              radius4 * 2 + px4 + radius3 * 0.17
            } ${py4 - radius3 * 0.24}`,

            2,
            3
          )}

          {/* // 2 , 4 */}
          {renderCircle(
            `M${px3 + radius3 * 2} ${py3} A${radius3} ${radius3} 0 0 1 ${
              px3 + radius3 + Math.sin(Math.PI / 4) * radius3
            } ${py3 + Math.cos(Math.PI / 4) * radius3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${radius4 * 2 + px4 + radius3 * 0.05} ${py4 + radius3 * 0.39} L${
              radius4 * 2 + px4 + radius3 * 0.17
            } ${py4 + radius3 * 0.39}`,

            2,
            4
          )}

          {/* // 2 , 5 */}
          {renderCircle(
            `M${px3 + radius3 + Math.sin(Math.PI / 4) * radius3} ${
              py3 + Math.cos(Math.PI / 4) * radius3
            } A${radius3} ${radius3} 0 0 1 ${px3 + radius3} ${py3 + radius3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${px4 + radius4 * 1.4} ${py4 + radius4 + radius3 * 0.18} L${
              px4 + radius4 * 1.4 + radius3 * 0.22
            } ${py4 + radius4 + radius3 * 0.18}`,

            2,
            5
          )}

          {/* // 2 , 6 */}
          {renderCircle(
            `M${px3 + radius3} ${py3 + radius3} A${radius3} ${radius3} 0 0 1 ${
              px3 + radius3 - Math.sin(Math.PI / 4) * radius3
            } ${py3 + Math.cos(Math.PI / 4) * radius3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${px4 + radius4 * 0.6 - radius3 * 0.12} ${
              py4 + radius4 + radius3 * 0.18
            } L${px4 + radius4 * 0.6} ${py4 + radius4 + radius3 * 0.18}`,

            2,
            6
          )}

          {/* // 2 , 7 */}
          {renderCircle(
            `M${px3 + radius3 - Math.sin(Math.PI / 4) * radius3} ${
              py3 + Math.cos(Math.PI / 4) * radius3
            } A${radius3} ${radius3} 0 0 1 ${px3} ${py3} L${
              px3 + radius3
            } ${py3} Z`,

            `M${px4 - radius3 * 0.17} ${py4 + radius3 * 0.39} L${px4} ${
              py4 + radius3 * 0.39
            }`,

            2,
            7
          )}

          {/* // 3 , 0 */}
          {renderCircle(
            `M${px4} ${py4} A${radius4} ${radius4} 0 0 1 ${
              px4 + radius4 - Math.sin(Math.PI / 4) * radius4
            } ${py4 - Math.cos(Math.PI / 4) * radius4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${px5 - radius4 * 0.22} ${py5 - radius4 * 0.14} L${px5} ${
              py5 - radius4 * 0.14
            }`,

            3,
            0
          )}

          {/* // 3 , 1 */}
          {renderCircle(
            `M${px4 + radius4 - Math.sin(Math.PI / 4) * radius4} ${
              py4 - Math.cos(Math.PI / 4) * radius4
            } A${radius4} ${radius4} 0 0 1 ${px4 + radius4} ${py4 - radius4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${px5 + radius5 * 0.6 - radius4 * 0.15} ${
              py5 - radius5 * 1.02
            } L${px5 + radius5 * 0.6} ${py5 - radius5 * 1.02}`,

            3,
            1
          )}

          {/* // 3 , 2 */}
          {renderCircle(
            `M${px4 + radius4} ${py4 - radius4} A${radius4} ${radius4} 0 0 1 ${
              px4 + radius4 + Math.sin(Math.PI / 4) * radius4
            } ${py4 - Math.cos(Math.PI / 4) * radius4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${px5 + radius5 * 1.4} ${py5 - radius5 * 1.02} L${
              px5 + radius5 * 1.4 + radius4 * 0.22
            } ${py5 - radius5 * 1.02}`,

            3,
            2
          )}

          {/* // 3 , 3 */}
          {renderCircle(
            `M${px4 + radius4 + Math.sin(Math.PI / 4) * radius4} ${
              py4 - Math.cos(Math.PI / 4) * radius4
            } A${radius4} ${radius4} 0 0 1 ${px4 + radius4 * 2} ${py4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${radius5 * 2 + px5 + radius4 * 0.05} ${py5 - radius4 * 0.14} L${
              radius5 * 2 + px5 + radius4 * 0.22
            } ${py5 - radius4 * 0.14}`,

            3,
            3
          )}

          {/* // 3 , 4 */}
          {renderCircle(
            `M${px4 + radius4 * 2} ${py4} A${radius4} ${radius4} 0 0 1 ${
              px4 + radius4 + Math.sin(Math.PI / 4) * radius4
            } ${py4 + Math.cos(Math.PI / 4) * radius4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${radius5 * 2 + px5 + radius4 * 0.05} ${py5 + radius4 * 0.39} L${
              radius5 * 2 + px5 + radius4 * 0.22
            } ${py5 + radius4 * 0.39}`,

            3,
            4
          )}

          {/* // 3 , 5 */}
          {renderCircle(
            `M${px4 + radius4 + Math.sin(Math.PI / 4) * radius4} ${
              py4 + Math.cos(Math.PI / 4) * radius4
            } A${radius4} ${radius4} 0 0 1 ${px4 + radius4} ${py4 + radius4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${px5 + radius5 * 1.35} ${py5 + radius5 + radius4 * 0.24} L${
              px5 + radius5 * 1.4 + radius4 * 0.14
            } ${py5 + radius5 + radius4 * 0.24}`,

            3,
            5
          )}

          {/* // 3 , 6 */}
          {renderCircle(
            `M${px4 + radius4} ${py4 + radius4} A${radius4} ${radius4} 0 0 1 ${
              px4 + radius4 - Math.sin(Math.PI / 4) * radius4
            } ${py4 + Math.cos(Math.PI / 4) * radius4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${px5 + radius5 * 0.6 - radius4 * 0.14} ${
              py5 + radius5 + radius4 * 0.24
            } L${px5 + radius5 * 0.6} ${py5 + radius5 + radius4 * 0.24}`,

            3,
            6
          )}

          {/* // 3 , 7 */}
          {renderCircle(
            `M${px4 + radius4 - Math.sin(Math.PI / 4) * radius4} ${
              py4 + Math.cos(Math.PI / 4) * radius4
            } A${radius4} ${radius4} 0 0 1 ${px4} ${py4} L${
              px4 + radius4
            } ${py4} Z`,

            `M${px5 - radius4 * 0.22} ${py5 + radius4 * 0.39} L${px5} ${
              py5 + radius4 * 0.39
            }`,

            3,
            7
          )}
        </>
      )}
      {/* Example for a single circle */}
      {/* {renderCircle(
        `M${px} ${py} A${radius} ${radius} 0 0 1 ${
          px + radius - Math.sin(Math.PI / 4) * radius
        } ${py - Math.cos(Math.PI / 4) * radius} L${px + radius} ${py} Z`,
        `M${px} ${py} L${px + radius} ${py}`,
        0,
        0
      )} */}
    </Box>
  )
}
