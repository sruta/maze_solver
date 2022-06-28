interface IUniqueElement {
  id: string;
}

interface IDB<T extends IUniqueElement> {
  insert: (element: T) => any;
  fetch: (id: any) => T | undefined;
  update: (element: T) => T;
  delete: (id: any) => boolean;
}

interface IVolatileDB<T extends IUniqueElement> extends IDB<T> {
  storage: Map<string, T>;
}

export { IDB, IVolatileDB, IUniqueElement };
