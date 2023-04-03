type IReturn = any[];

class EratosthenesSieveAlgorithm {
    constructor() {}

    calculate(number: number): IReturn {
        try {
            if (number % 2 === 0) number -= 1;

            // Etapa 1
            const arraySize = (number + 1) / 2;
            const values: boolean[] = new Array(arraySize).fill(true);
            let p = 3;

            while (true) {
                // Etapa 2
                if (Math.pow(p, 2) > number) {
                    break;
                }

                // Etapa 3
                if (!values[(p - 1) / 2]) {
                    p += 2;
                    continue;
                }

                // Etapa 4

                // Instrução 1
                let t = Math.pow(p, 2);

                while (true) {
                    // Instrução 2
                    values[(t - 1) / 2] = false;
                    t += 2 * p;

                    if (t > number) {
                        p += 2;
                        break;
                    }
                }
            }

            const newValues = values
                .map((isPrimeNumber, index) => {
                    if (index === 0) return 2;

                    if (!isPrimeNumber) return null;

                    return 2 * index + 1;
                })
                .filter((primeNumber) => primeNumber !== null);

            return newValues;
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}

export { EratosthenesSieveAlgorithm };
