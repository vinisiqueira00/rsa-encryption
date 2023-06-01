interface IValue {
    factor: number
    multiplicity: number
}

export class FactorizationAlgorithm {
    private initialFactor = 2

    countRepetitions(list: Array<number>, number: number) {
        let count = 0

        list.forEach((value) => {
            if (value === number) count++
        })

        return count
    }

    calculate(number: number) {
        try {
            if (!Number.isInteger(number)) {
                throw new Error("Non-integer parameter")
            }

            const values: Array<number> = []

            let factor = this.initialFactor
            let numberAnalyzed = number

            while (true) {
                if (numberAnalyzed % factor === 0) {
                    values.push(factor)

                    numberAnalyzed = numberAnalyzed / factor
                    factor = this.initialFactor

                    continue
                }

                factor++

                if (factor > Math.sqrt(numberAnalyzed)) {
                    values.push(numberAnalyzed)
                    break
                }
            }

            const uniqueValues = values.filter(function (este, i) {
                return values.indexOf(este) === i
            })

            const newValues: Array<IValue> = uniqueValues.map((value) => {
                return {
                    factor: value,
                    multiplicity: this.countRepetitions(values, value),
                } as unknown as IValue
            })

            return newValues
        } catch (erro) {
            throw new Error((erro as any).message)
        }
    }
}
