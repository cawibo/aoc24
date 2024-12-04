import assert from "node:assert";

const test_input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const big_input = ``;

const createGrid = (input) => {
  return input.split("\n").map((line) => line.split(""));
};

const flip = (grid) => {
  return grid.map((line) => line.map((_) => _)).reverse();
};

const getLineXmasCount = (line) => {
  const xmasRegexp = /XMAS/g;

  const left = [...line.join("").matchAll(xmasRegexp)].length;
  const right = [...line.reverse().join("").matchAll(xmasRegexp)].length;

  return left + right;
};

const getHorizontalXmasCount = (grid) => {
  return grid.reduce((acc, curr) => acc + getLineXmasCount(curr), 0);
};

const getVerticalXmasCount = (grid) => {
  // stolen property =)
  const rotated = grid[0].map((_, colIndex) => grid.map((row) => row[colIndex]));

  return getHorizontalXmasCount(rotated);
};

const getDiagonalDownStartingAt = (grid, row, column) => {
  assert(row === 0 || column === 0, "row or column is misplaced - one must be 0");

  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  const expectedIterations = Math.min(gridWidth - column, gridHeight - row);
  const arrayOfDiagonalsLength = Array.from(Array(expectedIterations)).map((_, index) => index);

  const line = arrayOfDiagonalsLength.map((_, index) => grid[row + index][column + index]);

  return getLineXmasCount(line);
};

const getDiagonalDownXmasCount = (grid) => {
  const gridWidth = grid[0].length;
  const gridHeight = grid.length;

  // starting at all rows
  const arrayOfRowsLength = Array.from(Array(gridHeight)).map((_, index) => index);
  const rowDiagonals = arrayOfRowsLength.reduce((acc, row) => acc + getDiagonalDownStartingAt(grid, row, 0), 0);

  // starting at all columns (except the 0)
  const arrayOfColumnsLength = Array.from(Array(gridWidth - 1)).map((_, index) => index);
  const colDiagonals = arrayOfColumnsLength.reduce((acc, col) => acc + getDiagonalDownStartingAt(grid, 0, col + 1), 0);

  return rowDiagonals + colDiagonals;
};

const getDiagonalUpXmasCount = (grid) => {
  return getDiagonalDownXmasCount(flip(grid));
};

const getDiagonalXmasCount = (grid) => {
  const up = getDiagonalUpXmasCount(grid);
  const down = getDiagonalDownXmasCount(grid);

  return up + down;
};

const getGridXmasCount = (grid) => {
  const horizontal = getHorizontalXmasCount(grid);
  const vertical = getVerticalXmasCount(grid);
  const diagonal = getDiagonalXmasCount(grid);

  return horizontal + vertical + diagonal;
};

/** Part 2 */

const getLineMasCount = (line) => {
  const masRegexp = /MAS/g;

  const left = [...line.join("").matchAll(masRegexp)].length;
  const right = [...line.reverse().join("").matchAll(masRegexp)].length;

  return left + right;
};

const getGridX_MasCount = (grid) => {
  const maxRow = grid.length - 1;
  const maxColumn = grid[0].length - 1;

  let count = 0;

  for (let row = 1; row < maxRow; row++)
    for (let col = 1; col < maxColumn; col++) {
      const diagonalDown = [grid[row - 1][col - 1], grid[row][col], grid[row + 1][col + 1]];
      const diagonalUp = [grid[row + 1][col - 1], grid[row][col], grid[row - 1][col + 1]];

      const isXmasCross = getLineMasCount(diagonalUp) + getLineMasCount(diagonalDown) === 2;

      if (isXmasCross) count += 1;
    }

  return count;
};

/** End Result */

const testGrid = createGrid(test_input);
const partOneTestResult = getGridXmasCount(testGrid);

const grid = createGrid(big_input);
const partOneResult = getGridXmasCount(grid);

console.debug("part1", { test: partOneTestResult, result: partOneResult });

const partTwoTestResult = getGridX_MasCount(testGrid);
const partTwoResult = getGridX_MasCount(grid);

console.debug("part2", { test: partTwoTestResult, result: partTwoResult });

/** assertions -- test stuff */
const diagonalDownTestGrid = createGrid(`XS***
*MA**
**AM*
***SX`);
const diagonalDownResult = getDiagonalDownXmasCount(diagonalDownTestGrid) === 2;
assert(diagonalDownResult, "something up with diagonal down: " + diagonalDownResult);

const diagonalTestGrid = createGrid(`XS**X
*MAM*
*AAM*
S**SX`);
const diagonalResult = getDiagonalXmasCount(diagonalTestGrid);
assert(diagonalResult, "something up with diagonal: " + diagonalResult);

const verticalTestGrid = createGrid(`XS
MA
AM
SX`);
const verticalResult = getVerticalXmasCount(verticalTestGrid);
assert(verticalResult === 2, "something up with vertical: " + verticalResult);
assert(getLineXmasCount("XMASAMX".split("")) === 2, "something up with line count");
assert(
  getHorizontalXmasCount([
    ["X", "M", "A", "S"],
    ["S", "A", "M", "X"],
  ]) === 2,
  "something up with horizontal"
);
