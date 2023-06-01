export class EratosthenesSieveAlgorithm {
    calculate(number: number): any[] {
        try {
            if (number % 2 === 0) number -= 1

            const arraySize = (number + 1) / 2
            const values: boolean[] = new Array(arraySize).fill(true)
            let p = 3

            while (true) {
                if (Math.pow(p, 2) > number) {
                    break
                }

                if (!values[(p - 1) / 2]) {
                    p += 2
                    continue
                }

                let t = Math.pow(p, 2)

                while (true) {
                    values[(t - 1) / 2] = false
                    t += 2 * p

                    if (t > number) {
                        p += 2
                        break
                    }
                }
            }

            const newValues = values
                .map((isPrimeNumber, index) => {
                    if (index === 0) return 2

                    if (!isPrimeNumber) return null

                    return 2 * index + 1
                })
                .filter((primeNumber) => primeNumber !== null)

            return newValues
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
