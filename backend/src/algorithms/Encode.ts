import { BreakMessageIntoBlocks } from "../lib/BreakMessageIntoBlocks";
import { EratosthenesSieveAlgorithm } from "../lib/EratosthenesSieveAlgorithm";
import { FactorizationAlgorithm } from "../lib/FactorizationAlgorithm";
import { FermatAlgorithm } from "../lib/FermatAlgorithm";
import { ModularPotentialArithmeticAlgorithm } from "../lib/ModularPotentialArithmeticAlgorithm";

type IReturn = any[];

class Encode {
    calculateFi(n: number) {
        const fermatAlgorithm = new FermatAlgorithm();
        const factors = fermatAlgorithm.calculate(n);

        const fi = (factors[0] - 1) * (factors[1] -1);

        return fi;
    }

    calculateE(n: number) {
        const fi = this.calculateFi(n);

        const factorizationAlgorithm = new FactorizationAlgorithm();
        const fiFactored = factorizationAlgorithm.calculate(fi).map(fiFactor => fiFactor.factor);

        const eratosthenesSieveAlgorithm = new EratosthenesSieveAlgorithm();
        const eratosthenesList = eratosthenesSieveAlgorithm.calculate(n);

        let e = 0;

        eratosthenesList.forEach((eratosthenesValue) => {
            const hasInFiFactored = fiFactored.indexOf(eratosthenesValue);

            if (e === 0 && hasInFiFactored === -1) {
                e = eratosthenesValue;
            }
        })

        return e;
    }

    calculateBlocks(n: number, text: string ) {
        const breakMessageIntoBlocks = new BreakMessageIntoBlocks();
        const message = breakMessageIntoBlocks.textToMessage(text);
        const blocks = breakMessageIntoBlocks.encode(message, n);

        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()

        const e = this.calculateE(n)

        const encodedBlocks = blocks.map(block => {
            const blockEncoded = modularPotentialArithmetic.calculate(block, e, n)

            if (blockEncoded < 0) return blockEncoded + n

            return blockEncoded
        })

        return encodedBlocks
    }

    encode(n: number, text: string) {
        const encodedBlocks = this.calculateBlocks(n, text);

        return [...encodedBlocks];
    }
}

export { Encode };

