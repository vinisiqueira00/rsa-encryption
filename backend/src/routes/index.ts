import { Router } from "express";

import { euclideanAlgorithmRouter } from "./euclidean-algorithm.routes";
import { extendedEuclideanAlgorithmRouter } from "./extended-euclidean-algorithm.routes";

const routes = Router();

routes.use("/algorithm", euclideanAlgorithmRouter);
routes.use("/algorithm", extendedEuclideanAlgorithmRouter);

export { routes };
