import { Router } from "express";

import { breakMessageIntoBlocksRouter } from "./break-message-into-blocks.routes";
import { encodeRouter } from "./encode.routes";
import { eratosthenesSieveAlgorithmRouter } from "./eratosthenes-sieve-algorithm.routes";
import { euclideanAlgorithmRouter } from "./euclidean-algorithm.routes";
import { extendedEuclideanAlgorithmRouter } from "./extended-euclidean-algorithm.routes";
import { factorizationAlgorithmRouter } from "./factorization-algorithm.routes";
import { fermatAlgorithmRouter } from "./fermat-algorithm.routes";
import { helpersRouter } from "./helpers.routes";
import { modularArithmeticRouter } from "./modular-arithmetic.routes";
import { modularDivisionArithmeticRouter } from "./modular-division-arithmetic.routes";
import { modularPotentialArithmeticRouter } from "./modular-potential-arithmetic.routes";

const router = Router();

const routes = [
    euclideanAlgorithmRouter,
    extendedEuclideanAlgorithmRouter,
    factorizationAlgorithmRouter,
    fermatAlgorithmRouter,
    eratosthenesSieveAlgorithmRouter,
    modularArithmeticRouter,
    modularPotentialArithmeticRouter,
    modularDivisionArithmeticRouter,
    helpersRouter,
    breakMessageIntoBlocksRouter,
    encodeRouter,
];

router.use("/algorithm", ...routes);

export { router };
