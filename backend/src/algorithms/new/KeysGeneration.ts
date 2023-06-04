import { prime } from 'bigint-crypto-utils'

import { EuclideanAlgorithm } from '../../lib/new/EuclideanAlgorithm'
import { ModularDivisionArithmeticAlgorithm } from "../../lib/new/ModularDivisionArithmeticAlgorithm"

export class KeysGeneration {
    calculatePhi(p: bigint, q: bigint) {
        return (p - 1n) * (q - 1n)
    }

    calculateE(phi: bigint) {
        const euclideanAlgorithm = new EuclideanAlgorithm

        for (let e = 3n; e < phi; e += 2n) {
            const gcd = euclideanAlgorithm.calculate({
                firstNumber: e,
                secondNumber: phi
            })

            if (gcd === 1n) return e
        }
    }

    calculateD(e: bigint, phi: bigint) {
        const modularDivisionArithmetic = new ModularDivisionArithmeticAlgorithm()
        const inverseE = modularDivisionArithmetic.getInverse(e, phi)

        return inverseE
    }

    cipherKey(privateKey: string): string {
        let buffer = privateKey

        buffer = Buffer.from(buffer).toString('base64')
        buffer = Buffer.from(buffer).toString('base64')

        return buffer.toString()
    }

    async generatePrimesNumbers() {
        const bitLength = 2048
        return [await prime(bitLength), await prime(bitLength)]
    }

    async generate() {
        // Generate random P and Q values
        const [ p, q ] = await this.generatePrimesNumbers()

        // Calculate N value
        const n = p * q

        // Calulate E value
        const phi = this.calculatePhi(p, q)

        const e = this.calculateE(phi)

        if (!e) return

        // Calulate D value
        const d = this.calculateD(e, phi)

        const keys = {
            public: `${n.toString()}_${e.toString()}`,
            private: `${p.toString()}_${q.toString()}_${d.toString()}`,
        }

        keys.public = this.cipherKey(keys.public)
        keys.private = this.cipherKey(keys.private)

        console.log("[Keys] P: ", p)
        console.log("[Keys] Q: ", q)
        console.log("[Keys] N: ", n)
        console.log("[Keys] E: ", e)
        console.log("[Keys] Phi: ", phi)
        console.log("[Keys] D: ", d)

        return {
            publicKey: keys.public,
            privateKey: keys.private,
        }
    }
}

