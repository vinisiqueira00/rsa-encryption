interface IValue {
    rest: number;
    quotient: number | null;
    alpha: number;
    beta: number;
}

interface IReturn {
    params: {
        a: number;
        b: number;
    };
    mdc: number;
    alpha: number;
    beta: number;
}

class ExtendedEuclideanAlgorithm {
    constructor() {}

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
                    params: {
                        a: firstNumber,
                        b: secondNumber,
                    },
                    mdc: firstNumber,
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
                    params: {
                        a: firstNumber,
                        b: secondNumber,
                    },
                    mdc: smallerNumber,
                    alpha: alpha,
                    beta: beta,
                };
            }

            const valores: IValue[] = [
                { rest: higherNumber, quotient: null, alpha: 1, beta: 0 },
                { rest: smallerNumber, quotient: null, alpha: 0, beta: 1 },
            ];

            while (valores[1].rest !== 0) {
                const newQuotient = Math.trunc(
                    valores[0].rest / valores[1].rest
                );

                const newRest = valores[0].rest % valores[1].rest;

                const newAlpha =
                    valores[0].alpha - newQuotient * valores[1].alpha;

                const newBeta = valores[0].beta - newQuotient * valores[1].beta;

                valores[0] = valores[1];
                valores[1] = {
                    rest: newRest,
                    quotient: newQuotient,
                    alpha: newAlpha,
                    beta: newBeta,
                };
            }

            const alpha =
                higherNumber === firstNumber
                    ? valores[0].alpha
                    : valores[0].beta;
            const beta =
                higherNumber === firstNumber
                    ? valores[0].beta
                    : valores[0].alpha;

            return {
                params: {
                    a: firstNumber,
                    b: secondNumber,
                },
                mdc: valores[0].rest,
                alpha: alpha,
                beta: beta,
            };
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}

export { ExtendedEuclideanAlgorithm };
