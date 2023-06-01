export class ModularArithmeticAlgorithm {
    searchNumberIndex(values: number[][], number: number) {
        let counter = 0
        for (const value of values) {
            const result = value.findIndex((valueItem) => valueItem === number)

            if (result !== -1) {
                break
            }

            counter++
        }

        return counter
    }

    calculate(moduleNumber: number, number: number): number {
        try {
            if (!Number.isInteger(moduleNumber)) {
                throw new Error("Non-integer module number")
            }

            const values: number[][] = []

            for (let index = 0; index < moduleNumber; index++) {
                const loops = Math.ceil(Math.abs(number) / moduleNumber)

                values[index] = []
                for (let counter = loops; counter >= 1; counter--) {
                    values[index].push(index - moduleNumber * counter)
                }

                values[index].push(index)
            }

            let counter = moduleNumber
            let index = 0
            while (counter <= number) {
                const element: number[] = values[index]
                element.push(counter)

                index++

                if (index === moduleNumber) {
                    index = 0
                }

                counter++
            }

            const valuesIdx = this.searchNumberIndex(values, number)

            const loops = Math.ceil(Math.abs(number) / moduleNumber)

            if (
                Math.abs(values[valuesIdx][loops - 1]) <
                Math.abs(values[valuesIdx][loops])
            ) {
                return values[valuesIdx][loops - 1]
            } else {
                return values[valuesIdx][loops]
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
