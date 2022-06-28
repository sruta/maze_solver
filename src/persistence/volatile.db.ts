import { IVolatileDB, IUniqueElement } from "./db.interfaces";
import { v4 as uuidv4 } from "uuid";

const newVolatileDB = <T extends IUniqueElement>(
  storage?: Map<string, T>
): IVolatileDB<T> => {
  if (storage === undefined) {
    storage = new Map();
  }

  return {
    storage,

    insert: (element: T) => {
      element.id = uuidv4();
      storage?.set(element.id, element);
      return element.id;
    },

    fetch: (id: string) => {
      return storage?.get(id);
    },

    update: (element: T) => {
      storage?.set(element.id, element);
      return element;
    },

    delete: (id: string) => {
      return storage?.delete(id) ?? false;
    },
  };
};

export default newVolatileDB;
