export interface EuclideanAlgorithmProps {
    firstNumber: number
    secondNumber: number
}

export class EuclideanAlgorithm {
    private isValid(number: number, message: string): void {
        if (!Number.isInteger(number)) {
            throw new Error(message)
        }
    }

    public calculate({ firstNumber, secondNumber }: EuclideanAlgorithmProps): number {
        try {
            this.isValid(firstNumber, '[EuclideanAlgorithm] Parameter "firstNumber" is not an integer')
            this.isValid(secondNumber, '[EuclideanAlgorithm] Parameter "secondNumber" is not an integer')

            const smallerNumber = Math.min(firstNumber, secondNumber)
            const higherNumber = Math.max(firstNumber, secondNumber)

            const window = {
                firstField: higherNumber,
                secondField: smallerNumber,
            }

            let rest = 1

            while (rest !== 0) {
                rest = window.firstField % window.secondField
                window.firstField = window.secondField
                window.secondField = rest
            }

            return window.firstField
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
