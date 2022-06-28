import {
  GATE,
  IMaze,
  MazeCell,
  MazeLayout,
} from "../interfaces/maze.interfaces";

const notVisited = " ";

export const equalMazeCells = (a: MazeCell, b: MazeCell): boolean => {
  return a.length != b.length || a.length != 2
    ? false
    : a[0] == b[0] && a[1] == b[1];
};

export const validMazeCell = (cell: MazeCell, l: number): boolean => {
  return cell[0] >= 0 && cell[0] < l && cell[1] >= 0 && cell[1] < l;
};

// Main solver function
const simpleRecursiveSolver = (
  maze: MazeLayout,
  actual: MazeCell,
  finish: MazeCell,
  pattern: string[],
  patternIndex: number,
  solution: MazeLayout
): boolean => {
  if (equalMazeCells(actual, finish)) {
    // End condition
    solution[actual[0]][actual[1]] = maze[actual[0]][actual[1]];
    return true;
  }

  // Checks if we dont fell down
  if (!validMazeCell(actual, maze.length)) {
    return false;
  }

  // Checks if we already been here
  if (solution[actual[0]][actual[1]] != notVisited) {
    return false;
  }

  // Checks if the acual cell meets the pattern or is the start gate
  if (
    maze[actual[0]][actual[1]] != pattern[patternIndex] &&
    maze[actual[0]][actual[1]] != GATE
  ) {
    return false;
  }

  // Marks the current cell as visited
  solution[actual[0]][actual[1]] = maze[actual[0]][actual[1]];

  // Increments patternIndex if its not the start gate
  if (maze[actual[0]][actual[1]] != GATE) {
    patternIndex = patternIndex + 1 == pattern.length ? 0 : patternIndex + 1;
  }

  // Checks right cell
  if (
    simpleRecursiveSolver(
      maze,
      [actual[0] + 1, actual[1]],
      finish,
      pattern,
      patternIndex,
      solution
    )
  ) {
    return true;
  }

  // Checks top cell
  if (
    simpleRecursiveSolver(
      maze,
      [actual[0], actual[1] + 1],
      finish,
      pattern,
      patternIndex,
      solution
    )
  ) {
    return true;
  }

  // Checks left cell
  if (
    simpleRecursiveSolver(
      maze,
      [actual[0] - 1, actual[1]],
      finish,
      pattern,
      patternIndex,
      solution
    )
  ) {
    return true;
  }

  // Checks bottom cell
  if (
    simpleRecursiveSolver(
      maze,
      [actual[0], actual[1] - 1],
      finish,
      pattern,
      patternIndex,
      solution
    )
  ) {
    return true;
  }

  // None of the previous path was valid
  // Marks the current cell as not visited
  solution[actual[0]][actual[1]] = notVisited;

  // Decrements patternIndex
  patternIndex = patternIndex == 0 ? pattern.length - 1 : patternIndex - 1;

  return false;
};

// Finds the start and the finish of the maze
export const findGates = (maze: IMaze): MazeCell[] => {
  const out: MazeCell = [-1, -1];
  const gates: MazeCell[] = [out, out];
  for (let x = 0; x < maze.layout.length; x++) {
    for (let y = 0; y < maze.layout[x].length; y++) {
      if (maze.layout[x][y] == GATE) {
        if (equalMazeCells(gates[0], out)) {
          gates[0] = [x, y];
        } else {
          gates[1] = [x, y];
          return gates;
        }
      }
    }
  }
  return gates;
};

export const initializeLayout = (l: number): MazeLayout => {
  const layout: MazeLayout = new Array();
  for (let x = 0; x < l; x++) {
    const row = new Array();
    for (let y = 0; y < l; y++) {
      row.push(notVisited);
    }
    layout.push(row);
  }
  return layout;
};

const printLayout = (layout: MazeLayout) => {
  for (let i = 0; i < layout.length; i++) {
    for (let j = 0; j < layout.length; j++) {
      process.stdout.write(`+-`);
    }
    process.stdout.write(`+\n`);
    process.stdout.write(`|`);
    for (let j = 0; j < layout.length; j++) {
      process.stdout.write(`${layout[i][j]}|`);
    }
    process.stdout.write(` \n`);
  }
  for (let j = 0; j < layout.length; j++) {
    process.stdout.write(`+-`);
  }
  process.stdout.write(`+\n`);
};

// Setups the simple recursive solver
const simpleSolver = (maze: IMaze): MazeLayout => {
  const pattern = ["C", "C", "C", "D", "D", "D", "E", "E", "E", "D", "D", "D"];

  // We supose that the maze IS VALID, checks should been done at creation time
  const gates = findGates(maze);
  const solution = initializeLayout(maze.layout.length);

  if (
    simpleRecursiveSolver(maze.layout, gates[0], gates[1], pattern, 0, solution)
  ) {
    printLayout(solution);
    return solution;
  }

  return [];
};

export default simpleSolver;
