import newRepository from "../../src/repositories/maze.repository";
import { mazeDBMock, validMazeMock } from "./mocks";

describe("MazeRepository", () => {
  const db = mazeDBMock(validMazeMock);
  const repository = newRepository(db);

  describe("when inserting", () => {
    repository.insert(validMazeMock);
    it("should call db.insert", () => {
      expect(db.insert).toBeCalled();
      expect(db.insert).toBeCalledWith(validMazeMock);
    });
  });

  describe("when fetching", () => {
    const element = repository.fetch(validMazeMock.id);
    it("should call db.fetch", () => {
      expect(db.fetch).toBeCalled();
      expect(db.fetch).toBeCalledWith(validMazeMock.id);
    });
    it("should return the element if EXISTS", () => {
      expect(element).toEqual(validMazeMock);
    });
    it("should return an error if the element DOESN'T EXISTS", () => {
      expect(repository.fetch(validMazeMock.id + "x")).toHaveProperty(
        "message"
      );
    });
  });

  describe("when updating", () => {
    repository.update(validMazeMock);
    it("should call db.update", () => {
      expect(db.update).toBeCalled();
      expect(db.update).toBeCalledWith(validMazeMock);
    });
  });

  describe("when deleting", () => {
    const result = repository.delete(validMazeMock.id);
    it("should call db.update", () => {
      expect(db.delete).toBeCalled();
      expect(db.delete).toBeCalledWith(validMazeMock.id);
    });
    it("should return true if the element EXISTS", () => {
      expect(result).toBeTruthy();
    });
    it("should return an error if the element DOESN'T EXISTS", () => {
      expect(repository.delete(validMazeMock.id + "x")).toHaveProperty(
        "message"
      );
    });
  });
});
