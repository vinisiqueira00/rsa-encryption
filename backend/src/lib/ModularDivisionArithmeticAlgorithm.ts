import { ExtendedEuclideanAlgorithm } from "./ExtendedEuclideanAlgorithm"
import { ModularArithmeticAlgorithm } from "./ModularArithmeticAlgorithm"

export class ModularDivisionArithmeticAlgorithm {
    getInverse(number: number, moduleNumber: number): number {
        try {
            const extendedEuclidean = new ExtendedEuclideanAlgorithm()

            const result = extendedEuclidean.calculate(moduleNumber, number)

            if (result.greatestCommonDivisor === 1) {
                if (result.beta < 0) {
                    return result.beta + moduleNumber
                }

                return result.beta
            }

            return 0
        } catch (erro) {
            throw new Error((erro as any).message)
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
        } catch (erro) {
            throw new Error((erro as any).message)
        }
    }
}
