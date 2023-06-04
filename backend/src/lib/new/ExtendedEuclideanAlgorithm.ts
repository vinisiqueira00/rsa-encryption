export interface ExtendedEuclideanAlgorithmProps {
    firstNumber: bigint
    secondNumber: bigint
}

export class ExtendedEuclideanAlgorithm {
    private isValid(number: bigint, message: string): void {
        if (!number) {
            throw new Error(message)
        }
    }

    private getSmallerNumber(firstNumber: bigint, secondNumber: bigint) {
        if (firstNumber < secondNumber) return firstNumber

        return secondNumber
    }

    private getHigherNumber(firstNumber: bigint, secondNumber: bigint) {
        if (firstNumber > secondNumber) return firstNumber

        return secondNumber
    }

    public calculate({ firstNumber, secondNumber }: ExtendedEuclideanAlgorithmProps): {
        greatestCommonDivisor: bigint
        alpha: bigint
        beta: bigint
    } {
        try {
            this.isValid(firstNumber, '[ExtendedEuclideanAlgorithm] Parameter "firstNumber" is not an integer')
            this.isValid(secondNumber, '[ExtendedEuclideanAlgorithm] Parameter "secondNumber" is not an integer')

            if (firstNumber === secondNumber) {
                return { greatestCommonDivisor: firstNumber, alpha: 2n, beta: -1n }
            }

            const smallerNumber = this.getSmallerNumber(firstNumber, secondNumber)
            const higherNumber = this.getHigherNumber(firstNumber, secondNumber)

            if (higherNumber % smallerNumber === 0n) {
                const quotient = higherNumber / smallerNumber

                const alpha = higherNumber === firstNumber ? 1n : 1n - quotient
                const beta = higherNumber === firstNumber ? 1n - quotient : 1n

                return {
                    greatestCommonDivisor: smallerNumber,
                    alpha: alpha,
                    beta: beta,
                }
            }

            const values: {
                rest: bigint
                quotient: bigint | null
                alpha: bigint
                beta: bigint
            }[] = [
                { rest: higherNumber, quotient: null, alpha: 1n, beta: 0n },
                { rest: smallerNumber, quotient: null, alpha: 0n, beta: 1n },
            ]

            while (values[1].rest !== 0n) {
                const newQuotient = values[0].rest / values[1].rest

                const newRest = values[0].rest % values[1].rest

                const newAlpha =
                    values[0].alpha - newQuotient * values[1].alpha

                const newBeta = values[0].beta - newQuotient * values[1].beta

                values[0] = values[1]
                values[1] = {
                    rest: newRest,
                    quotient: newQuotient,
                    alpha: newAlpha,
                    beta: newBeta,
                }
            }

            const alpha =
                higherNumber === firstNumber ? values[0].alpha : values[0].beta
            const beta =
                higherNumber === firstNumber ? values[0].beta : values[0].alpha

            return {
                greatestCommonDivisor: values[0].rest,
                alpha: alpha,
                beta: beta,
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
