import { ExtendedEuclideanAlgorithm } from "./ExtendedEuclideanAlgorithm"
import { ModularArithmeticAlgorithm } from "./ModularArithmeticAlgorithm"

export class ModularDivisionArithmeticAlgorithm {
    getInverse(number: bigint, moduleNumber: bigint): bigint {
        try {
            const extendedEuclidean = new ExtendedEuclideanAlgorithm()
            const result = extendedEuclidean.calculate({ firstNumber: moduleNumber, secondNumber: number})

            if (result.greatestCommonDivisor === 1n) {
                if (result.beta < 0n) {
                    return result.beta + moduleNumber
                }

                return result.beta
            }

            return 0n
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    calculate(
        firstNumber: bigint,
        secondNumber: bigint,
        moduleNumber: bigint
    ): any {
        try {
            const inverseSecondNumber = this.getInverse(secondNumber, moduleNumber)
            const result = firstNumber * inverseSecondNumber

            const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm()
            const response = modularArithmeticAlgorithm.calculate(
                moduleNumber,
                result
            )

            return response
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
