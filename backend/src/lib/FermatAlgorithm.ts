export class FermatAlgorithm {
    calculate(number: number): [number, number] {
        try {
            if (!Number.isInteger(number)) {
                throw new Error("Non-integer parameter")
            }

            if (number % 2 == 0) return [2, number / 2]

            let x = Math.trunc(Math.sqrt(number))

            if (Math.pow(x, 2) === number) return [x, x]

            let y

            while (true) {
                x++

                y = Math.sqrt(Math.pow(x, 2) - number)

                if (Math.trunc(y) === y) {
                    break
                }

                if (x === (number + 1) / 2) {
                    return [number, 1]
                }
            }

            return [x - y, x + y]
        } catch (erro) {
            throw new Error((erro as any).message)
        }
    }
}
