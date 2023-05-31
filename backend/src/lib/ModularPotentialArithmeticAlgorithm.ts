import { ModularArithmeticAlgorithm } from "./ModularArithmeticAlgorithm";

enum ReasonsBreakLooping {
    EXPOENT_ACHIEVED="EXPOENT ACHIEVED",
    ZERO_FOUND="ZERO FOUND",
    ONE_FOUND="ONE FOUND",
}

export class ModularPotentialArithmeticAlgorithm {
    calculate(
        baseNumber: number,
        exponentNumber: number,
        moduleNumber: number
    ): number {
        try {
            if (
                !Number.isInteger(baseNumber) ||
                !Number.isInteger(exponentNumber) ||
                !Number.isInteger(moduleNumber)
            ) {
                throw new Error("Non-integer module number")
            }

            const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm()

            const loopingValues: number[] = [1]

            let reasonBreak: ReasonsBreakLooping = ReasonsBreakLooping.EXPOENT_ACHIEVED
            let counter = 1

            while(counter <= exponentNumber) {
                const result = baseNumber * loopingValues[loopingValues.length - 1]
                const resultTranslated = modularArithmeticAlgorithm.calculate(moduleNumber, result)

                loopingValues.push(resultTranslated)

                if (resultTranslated === 0) {
                    reasonBreak = ReasonsBreakLooping.ZERO_FOUND
                    break
                }

                if (resultTranslated === 1) {
                    reasonBreak = ReasonsBreakLooping.ONE_FOUND
                    break
                }

                counter++
            }

            switch (reasonBreak) {
                case ReasonsBreakLooping.EXPOENT_ACHIEVED: {
                    return loopingValues.pop() ?? 1
                }
                case ReasonsBreakLooping.ZERO_FOUND: {
                    return 0
                }
                case ReasonsBreakLooping.ONE_FOUND: {
                    loopingValues.pop()
                    const loopsQuantity = Math.floor(exponentNumber/loopingValues.length)
                    const indexResult = exponentNumber - (loopsQuantity * loopingValues.length)
                    return loopingValues[indexResult]
                }
            }
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}
