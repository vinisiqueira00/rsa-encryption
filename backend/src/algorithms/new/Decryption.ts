import { Helpers } from "../../helpers/Helpers"
import { ModularPotentialArithmeticAlgorithm } from "../../lib/new/ModularPotentialArithmeticAlgorithm"

export class Decryption {
    decipherPrivateKey(privateKey: string) {
        let result = privateKey

        result = Buffer.from(result, 'base64').toString()
        result = Buffer.from(result, 'base64').toString()

        return {
            p: BigInt(result.toString().split('_')[0]),
            q: BigInt(result.toString().split('_')[1]),
            d: BigInt(result.toString().split('_')[2]),
        }
    }

    decode({blocksEncoded, privateKey}: {blocksEncoded: string[], privateKey: string}) {
        const { p, q, d } = this.decipherPrivateKey(privateKey)

        const n = p * q

        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()
        const blocksDecoded = blocksEncoded.map(blockEncoded => {
            const blockDecoded = modularPotentialArithmetic.calculate(BigInt(blockEncoded), d, n)
            return (blockDecoded < 0) ? blockDecoded + n : blockDecoded
        })

        const textDecoded = blocksDecoded.join('')

        const charCodeList = textDecoded.match(/.{1,3}/g) || []

        const message = charCodeList.map(charCode => Helpers.codeToChar(parseInt(charCode))).join('')

        console.log("[Decryption] P: ", p)
        console.log("[Decryption] Q: ", q)
        console.log("[Decryption] N: ", n)
        console.log("[Decryption] D: ", d)
        console.log("[Decryption] blocos codificados: ", blocksEncoded)
        console.log("[Decryption] blocos: ", blocksDecoded)
        console.log("[Decryption] texto em dígitos: ", textDecoded)
        console.log("[Decryption] texto: ", message)

        return message
    }
}

