import { IMaze, IMazeRepository } from "../interfaces/maze.interfaces";
import { IDB } from "../persistence/db.interfaces";

const newRepository = (db: IDB<IMaze>): IMazeRepository => {
  return {
    insert: (element: IMaze) => {
      return db.insert(element);
    },

    fetch: (id: string) => {
      const element = db.fetch(id);
      if (element == undefined) {
        return new Error(`${id} not found in database`);
      }
      return element;
    },

    update: (element: IMaze) => {
      return db.update(element);
    },

    delete: (id: string) => {
      if (db.delete(id)) {
        return true;
      }
      return new Error(`${id} could not be deleted`);
    },
  };
};

export default newRepository;
