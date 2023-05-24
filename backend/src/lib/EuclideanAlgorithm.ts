export class EuclideanAlgorithm {
    calculate(firstNumber: number, secondNumber: number) {
        try {
            if (
                !Number.isInteger(firstNumber) ||
                !Number.isInteger(secondNumber)
            ) {
                throw new Error("Non-integer parameter(s)");
            }

            const smallerNumber = Math.min(firstNumber, secondNumber);
            const higherNumber = Math.max(firstNumber, secondNumber);

            const window = {
                firstField: higherNumber,
                secondField: smallerNumber,
            };

            let rest = 1;

            while (rest !== 0) {
                rest = window.firstField % window.secondField;
                window.firstField = window.secondField;
                window.secondField = rest;
            }

            return window.firstField;
        } catch (error) {
            throw new Error((error as any).message);
        }
    }
}
