import { ExtendedEuclideanAlgorithm } from "./ExtendedEuclideanAlgorithm";
import { ModularArithmeticAlgorithm } from "./ModularArithmeticAlgorithm";

type IReturn = any;

class ModularDivisionArithmeticAlgorithm {
    constructor() {}

    getInverse(number: number, moduleNumber: number): number {
        try {
            const extendedEuclidean = new ExtendedEuclideanAlgorithm();

            const result = extendedEuclidean.calculate(moduleNumber, number);

            if (result.greatestCommonDivisor === 1) {
                if (result.beta < 0) {
                    return result.beta + moduleNumber;
                }

                return result.beta;
            }

            return 0;
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }

    calculate(
        firstNumber: number,
        secondNumber: number,
        moduleNumber: number
    ): IReturn {
        try {
            const result =
                firstNumber * this.getInverse(secondNumber, moduleNumber);

            const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm();
            const response = modularArithmeticAlgorithm.calculate(
                moduleNumber,
                result
            );

            return response;

            return [
                `Inverso de 1 (mod 4) = ${this.getInverse(1, 4)}`,
                `Inverso de 2 (mod 4) = ${this.getInverse(2, 4)}`,
                `Inverso de 3 (mod 4) = ${this.getInverse(3, 4)}`,
                `Inverso de 4 (mod 4) = ${this.getInverse(4, 4)}`,
                "----",
                "----",
                "----",
                `Inverso de 1 (mod 11) = ${this.getInverse(1, 11)}`,
                `Inverso de 2 (mod 11) = ${this.getInverse(2, 11)}`,
                `Inverso de 3 (mod 11) = ${this.getInverse(3, 11)}`,
                `Inverso de 4 (mod 11) = ${this.getInverse(4, 11)}`,
                `Inverso de 5 (mod 11) = ${this.getInverse(5, 11)}`,
                `Inverso de 6 (mod 11) = ${this.getInverse(6, 11)}`,
                `Inverso de 7 (mod 11) = ${this.getInverse(7, 11)}`,
                `Inverso de 8 (mod 11) = ${this.getInverse(8, 11)}`,
                `Inverso de 9 (mod 11) = ${this.getInverse(9, 11)}`,
                `Inverso de 10 (mod 11) = ${this.getInverse(10, 11)}`,
                `Inverso de 11 (mod 11) = ${this.getInverse(11, 11)}`,
                "----",
                "----",
                "----",
                `Inverso de 1 (mod 15) = ${this.getInverse(1, 15)}`,
                `Inverso de 2 (mod 15) = ${this.getInverse(2, 15)}`,
                `Inverso de 3 (mod 15) = ${this.getInverse(3, 15)}`,
                `Inverso de 4 (mod 15) = ${this.getInverse(4, 15)}`,
                `Inverso de 5 (mod 15) = ${this.getInverse(5, 15)}`,
                `Inverso de 6 (mod 15) = ${this.getInverse(6, 15)}`,
                `Inverso de 7 (mod 15) = ${this.getInverse(7, 15)}`,
                `Inverso de 8 (mod 15) = ${this.getInverse(8, 15)}`,
                `Inverso de 9 (mod 15) = ${this.getInverse(9, 15)}`,
                `Inverso de 10 (mod 15) = ${this.getInverse(10, 15)}`,
                `Inverso de 11 (mod 15) = ${this.getInverse(11, 15)}`,
                `Inverso de 12 (mod 15) = ${this.getInverse(12, 15)}`,
                `Inverso de 13 (mod 15) = ${this.getInverse(13, 15)}`,
                `Inverso de 14 (mod 15) = ${this.getInverse(14, 15)}`,
                `Inverso de 15 (mod 15) = ${this.getInverse(15, 15)}`,
            ];
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}

export { ModularDivisionArithmeticAlgorithm };
