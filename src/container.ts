import newService from "./services/maze.service";
import newMazeController from "./controllers/maze.controller";
import IContainer from "./interfaces/container.interfaces";
import newVolatileDB from "./persistence/volatile.db";
import newRepository from "./repositories/maze.repository";
import { IMaze } from "./interfaces/maze.interfaces";
import simpleSolver from "./utils/solvers";

let container: IContainer | undefined = undefined;

const initializeContainer = (): IContainer => {
  // Singleton container
  if (container == undefined) {
    const db = newVolatileDB<IMaze>();
    const mazeRepository = newRepository(db);
    const mazeService = newService(mazeRepository, simpleSolver);
    const mazeController = newMazeController(mazeService);

    container = {
      mazeController: mazeController,
    };
  }

  return container;
};

export default initializeContainer;
