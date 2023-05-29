import { Helpers } from "../helpers/Helpers";
import { EratosthenesSieveAlgorithm } from "../lib/EratosthenesSieveAlgorithm";
import { FactorizationAlgorithm } from "../lib/FactorizationAlgorithm";
import { FermatAlgorithm } from "../lib/FermatAlgorithm";
import { ModularDivisionArithmeticAlgorithm } from "../lib/ModularDivisionArithmeticAlgorithm";
import { ModularPotentialArithmeticAlgorithm } from "../lib/ModularPotentialArithmeticAlgorithm";

export class Decryption {
    calculatePhi(n: number) {
        const fermatAlgorithm = new FermatAlgorithm();
        const [firstFactor, secondFactor] = fermatAlgorithm.calculate(n);

        return (firstFactor - 1) * (secondFactor - 1);
    }

    calculateE(n: number) {
        const phi = this.calculatePhi(n);

        const factorizationAlgorithm = new FactorizationAlgorithm();
        const phiFactored = factorizationAlgorithm.calculate(phi).map(phiFactor => phiFactor.factor);

        const eratosthenesSieveAlgorithm = new EratosthenesSieveAlgorithm();
        const eratosthenesList = eratosthenesSieveAlgorithm.calculate(n);

        let e = 0;

        eratosthenesList.forEach((eratosthenesValue) => {
            const hasInPhiFactored = phiFactored.indexOf(eratosthenesValue);

            if (e === 0 && hasInPhiFactored === -1) {
                e = eratosthenesValue;
            }
        })

        return e;
    }

    decode(n: number, blocksEncoded: number[] ) {
        const phi = this.calculatePhi(n)
        const e = this.calculateE(n)

        console.log('e', e)

        const modularDivisionArithmetic = new ModularDivisionArithmeticAlgorithm()
        const inverseE = modularDivisionArithmetic.getInverse(e, phi)

        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()
        const blocksDecoded = blocksEncoded.map(blockEncoded => {
            const blockDecoded = modularPotentialArithmetic.calculate(blockEncoded, inverseE, n)

            if (blockDecoded < 0) return blockDecoded + n

            return blockDecoded
        })

        const digitText = blocksDecoded.join('')


        const result: string[] = [];

        for (let i = 0; i < digitText.length; i += 3) {
            const threeChars = digitText.substr(i, 3);
            result.push(threeChars);
        }

        const text = result.map(charCode => Helpers.codeToChar(parseInt(charCode)))

        return text.join('')

        // const breakMessageIntoBlocks = new BreakMessageIntoBlocks();
        // const blocks = breakMessageIntoBlocks.encode(text, n);

        // const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()

        // const encodedBlocks = blocks.map(block => {
        //     const blockEncoded = modularPotentialArithmetic.calculate(block, e, n)

        //     if (blockEncoded < 0) return blockEncoded + n

        //     return blockEncoded
        // })

        // return encodedBlocks
    }
}

