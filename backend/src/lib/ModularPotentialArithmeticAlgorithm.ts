import { ModularArithmeticAlgorithm } from "./ModularArithmeticAlgorithm";

type IReturn = number;

class ModularPotentialArithmeticAlgorithm {
    constructor() {}

    getLastInsertInTheValues(values: number[][]) {
        let idxMoreElements = 0;
        for (let index = 0; index < values.length; index++) {
            const element = values[index];

            if (element.length >= values[idxMoreElements].length) {
                idxMoreElements = index;
            }
        }

        return values[idxMoreElements][values[idxMoreElements].length - 1];
    }

    calculate(
        baseNumber: number,
        exponentNumber: number,
        moduleNumber: number
    ): IReturn {
        try {
            if (
                !Number.isInteger(baseNumber) ||
                !Number.isInteger(exponentNumber) ||
                !Number.isInteger(moduleNumber)
            ) {
                throw new Error("Non-integer module number");
            }

            const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm();

            const values: number[][] = [];

            for (let index = 0; index < moduleNumber; index++) {
                values[index] = [];
            }

            let counter = 1;
            let index = 0;
            while (true) {
                if (exponentNumber === 0) {
                    values[index].push(1);
                } else if (counter === 1) {
                    const resultFormated = modularArithmeticAlgorithm.calculate(
                        moduleNumber,
                        baseNumber
                    );

                    values[index].push(resultFormated);
                } else if (index === 0) {
                    const idxLastArray = values.length - 1;
                    const currentPostElement = values[index].length - 1;

                    const resultFormated = modularArithmeticAlgorithm.calculate(
                        moduleNumber,
                        values[0][0] * values[idxLastArray][currentPostElement]
                    );

                    values[index].push(resultFormated);
                } else {
                    const previousArray = index - 1;
                    const currentPostElement = values[index].length;

                    const resultFormated = modularArithmeticAlgorithm.calculate(
                        moduleNumber,
                        values[0][0] * values[previousArray][currentPostElement]
                    );

                    values[index].push(resultFormated);
                }

                counter++;

                if (counter > exponentNumber) break;

                index++;

                if (index === moduleNumber) index = 0;
            }

            return this.getLastInsertInTheValues(values);
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}

export { ModularPotentialArithmeticAlgorithm };
