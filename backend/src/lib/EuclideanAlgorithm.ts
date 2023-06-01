export class EuclideanAlgorithm {
    isValid(number: number, message: string) {
        if (!Number.isInteger(number)) {
            throw new Error(message)
        }
    }

    calculate(firstNumber: number, secondNumber: number) {
        try {
            this.isValid(firstNumber, 'Non-integer "firstNumber" parameter')
            this.isValid(secondNumber, 'Non-integer "secondNumber" parameter')

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
