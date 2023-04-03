import { Router } from "express";

import { euclideanAlgorithmRouter } from "./euclidean-algorithm.routes";
import { extendedEuclideanAlgorithmRouter } from "./extended-euclidean-algorithm.routes";
import { factorizationAlgorithmRouter } from "./factorization-algorithm.routes";
import { fermatAlgorithmRouter } from "./fermat-algorithm.routes";
import { eratosthenesSieveAlgorithmRouter } from "./eratosthenes-sieve-algorithm.routes";

const router = Router();

const routes = [
    euclideanAlgorithmRouter,
    extendedEuclideanAlgorithmRouter,
    factorizationAlgorithmRouter,
    fermatAlgorithmRouter,
    eratosthenesSieveAlgorithmRouter,
];

router.use("/algorithm", ...routes);

export { router };
