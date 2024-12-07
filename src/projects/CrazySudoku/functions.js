export const isNotZeroArray = nestedArray => {
  const a = nestedArray.every(innerArray =>
    innerArray.every(element => element !== 0)
  )
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
