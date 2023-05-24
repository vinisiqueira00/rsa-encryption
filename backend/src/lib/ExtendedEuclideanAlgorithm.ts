interface IValue {
    rest: number;
    quotient: number | null;
    alpha: number;
    beta: number;
}

interface IReturn {
    greatestCommonDivisor: number;
    alpha: number;
    beta: number;
}

export class ExtendedEuclideanAlgorithm {
    calculate(firstNumber: number, secondNumber: number): IReturn {
        try {
            if (
                !Number.isInteger(firstNumber) ||
                !Number.isInteger(secondNumber)
            ) {
                throw new Error("Non-integer parameter(s)");
            }

            if (firstNumber === secondNumber) {
                return {
                    greatestCommonDivisor: firstNumber,
                    alpha: 2,
                    beta: -1,
                };
            }

            const smallerNumber = Math.min(firstNumber, secondNumber);
            const higherNumber = Math.max(firstNumber, secondNumber);

            if (higherNumber % smallerNumber === 0) {
                const quotient = Math.trunc(higherNumber / smallerNumber);

                const alpha = higherNumber === firstNumber ? 1 : 1 - quotient;
                const beta = higherNumber === firstNumber ? 1 - quotient : 1;

                return {
                    greatestCommonDivisor: smallerNumber,
                    alpha: alpha,
                    beta: beta,
                };
            }

            const values: IValue[] = [
                { rest: higherNumber, quotient: null, alpha: 1, beta: 0 },
                { rest: smallerNumber, quotient: null, alpha: 0, beta: 1 },
            ];

            while (values[1].rest !== 0) {
                const newQuotient = Math.trunc(values[0].rest / values[1].rest);

                const newRest = values[0].rest % values[1].rest;

                const newAlpha =
                    values[0].alpha - newQuotient * values[1].alpha;

                const newBeta = values[0].beta - newQuotient * values[1].beta;

                values[0] = values[1];
                values[1] = {
                    rest: newRest,
                    quotient: newQuotient,
                    alpha: newAlpha,
                    beta: newBeta,
                };
            }

            const alpha =
                higherNumber === firstNumber ? values[0].alpha : values[0].beta;
            const beta =
                higherNumber === firstNumber ? values[0].beta : values[0].alpha;

            return {
                greatestCommonDivisor: values[0].rest,
                alpha: alpha,
                beta: beta,
            };
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}
