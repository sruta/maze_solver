import { Router } from "express";
import IContainer from "../interfaces/container.interfaces";

const newMazeRouter = (router: Router, container: IContainer): Router => {
  const baseRoute = "/maze";

  router.post(baseRoute, container.mazeController.create);
  router.post(
    `${baseRoute}/autogenerate`,
    container.mazeController.createAutogenerated
  );
  router.get(`${baseRoute}/:id`, container.mazeController.get);
  router.post(`${baseRoute}/:id/solve`, container.mazeController.solve);

  return router;
};

export default newMazeRouter;