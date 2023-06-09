import { ExtendedEuclideanAlgorithm } from "./ExtendedEuclideanAlgorithm"
import { ModularArithmeticAlgorithm } from "./ModularArithmeticAlgorithm"

export class ModularDivisionArithmeticAlgorithm {
    getInverse(number: number, moduleNumber: number): number {
        try {
            const extendedEuclidean = new ExtendedEuclideanAlgorithm()

            const result = extendedEuclidean.calculate({ firstNumber: moduleNumber, secondNumber: number})

            if (result.greatestCommonDivisor === 1) {
                if (result.beta < 0) {
                    return result.beta + moduleNumber
                }

                return result.beta
            }

            return 0
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    calculate(
        firstNumber: number,
        secondNumber: number,
        moduleNumber: number
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
