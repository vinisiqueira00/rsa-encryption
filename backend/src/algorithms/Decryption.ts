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

        const modularDivisionArithmetic = new ModularDivisionArithmeticAlgorithm()
        const inverseE = modularDivisionArithmetic.getInverse(e, phi)

        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()
        const blocksDecoded = blocksEncoded.map(blockEncoded => {
            const blockDecoded = modularPotentialArithmetic.calculate(blockEncoded, inverseE, n);
            return (blockDecoded < 0) ? blockDecoded + n : blockDecoded;
        })

        const textDecoded = blocksDecoded.join('')

        const charCodeList = textDecoded.match(/.{1,3}/g) || [];

        const message = charCodeList.map(charCode => Helpers.codeToChar(parseInt(charCode))).join('')

        return message
    }
}

