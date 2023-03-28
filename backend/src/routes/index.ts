import { Router } from "express";

import { euclideanAlgorithmRouter } from "./euclidean-algorithm.routes";
import { extendedEuclideanAlgorithmRouter } from "./extended-euclidean-algorithm.routes";
import { factorizationAlgorithmRouter } from "./factorization-algorithm.routes";
import { fermatAlgorithmRouter } from "./fermat-algorithm.routes";

const routes = Router();

routes.use("/algorithm", euclideanAlgorithmRouter);
routes.use("/algorithm", extendedEuclideanAlgorithmRouter);
routes.use("/algorithm", factorizationAlgorithmRouter);
routes.use("/algorithm", fermatAlgorithmRouter);

export { routes };
