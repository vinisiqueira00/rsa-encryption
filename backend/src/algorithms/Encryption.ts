import { BreakMessageIntoBlocks } from "../lib/BreakMessageIntoBlocks"
import { EratosthenesSieveAlgorithm } from "../lib/EratosthenesSieveAlgorithm"
import { FactorizationAlgorithm } from "../lib/FactorizationAlgorithm"
import { FermatAlgorithm } from "../lib/FermatAlgorithm"
import { ModularPotentialArithmeticAlgorithm } from "../lib/ModularPotentialArithmeticAlgorithm"

export class Encryption {
    calculatePhi(n: number) {
        const fermatAlgorithm = new FermatAlgorithm()
        const [firstFactor, secondFactor] = fermatAlgorithm.calculate(n)

        return (firstFactor - 1) * (secondFactor - 1)
    }

    calculateE(n: number) {
        const phi = this.calculatePhi(n)

        const factorizationAlgorithm = new FactorizationAlgorithm()
        const phiFactored = factorizationAlgorithm.calculate(phi).map(phiFactor => phiFactor.factor)

        const eratosthenesSieveAlgorithm = new EratosthenesSieveAlgorithm()
        const eratosthenesList = eratosthenesSieveAlgorithm.calculate(n)

        let e = 0

        eratosthenesList.forEach((eratosthenesValue) => {
            const hasInPhiFactored = phiFactored.indexOf(eratosthenesValue)

            if (e === 0 && hasInPhiFactored === -1) {
                e = eratosthenesValue
            }
        })

        return e
    }

    encode(n: number, text: string ) {
        const e = this.calculateE(n)

        const breakMessageIntoBlocks = new BreakMessageIntoBlocks()
        const blocks = breakMessageIntoBlocks.encode(text, n)

        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()

        const encodedBlocks = blocks.map(block => {
            const blockEncoded = modularPotentialArithmetic.calculate(block, e, n)
            return (blockEncoded < 0) ? blockEncoded + n : blockEncoded
        })

        return encodedBlocks
    }
}

