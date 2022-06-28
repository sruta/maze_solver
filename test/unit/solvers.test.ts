import { IMaze, MazeLayout } from "../../src/interfaces/maze.interfaces";
import simpleSolver, {
  equalMazeCells,
  findGates,
  initializeLayout,
  validMazeCell,
} from "../../src/utils/solvers";
import {
  insolbableMazeMock,
  validEmptyMazeLayoutMock,
  validMazeLayoutSolutionMock,
  validMazeMock,
} from "./mocks";

describe("MazeSolvers", () => {
  describe("equalMazeCells()", () => {
    it("should return TRUE if the cells are equal", () => {
      expect(equalMazeCells([1, 1], [1, 1])).toBeTruthy();
    });
    it("should return FALSE if the cells are different", () => {
      expect(equalMazeCells([-1, -1], [1, 1])).toBeFalsy();
    });
  });

  describe("validMazeCell()", () => {
    it("should return TRUE if the cell is inside a layout of lenght l", () => {
      expect(validMazeCell([1, 1], 5)).toBeTruthy();
    });
    it("should return FALSE if the cell is outside a layout of lenght l", () => {
      expect(validMazeCell([10, 1], 5)).toBeFalsy();
    });
  });

  describe("findGates()", () => {
    it("should return an array of MazeCells with the start and the finish points", () => {
      expect(findGates(validMazeMock)).toEqual([
        [0, 2],
        [2, 0],
      ]);
    });
  });

  describe("initializeLayout()", () => {
    it("should return an initialized maze layout with blanks", () => {
      expect(initializeLayout(validEmptyMazeLayoutMock.length)).toEqual(
        validEmptyMazeLayoutMock
      );
    });
  });

  describe("simpleSolver()", () => {
    it("should return the solution of the maze in a layout showing the path", () => {
      const result = simpleSolver(validMazeMock);
      expect(result).toEqual(validMazeLayoutSolutionMock);
      expect(result.length).toEqual(validMazeMock.layout.length);
    });
    it("should return an empty layout if the maze doesn't have solution", () => {
      expect(simpleSolver(insolbableMazeMock)).toEqual([]);
    });
  });
});
