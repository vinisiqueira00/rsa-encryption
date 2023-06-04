import { BreakMessageIntoBlocks } from "../../lib/new/BreakMessageIntoBlocks"
import { ModularPotentialArithmeticAlgorithm } from "../../lib/new/ModularPotentialArithmeticAlgorithm"

export class Encryption {
    decipherKey(publicKey: string) {
        let result = publicKey

        result = Buffer.from(result, 'base64').toString()
        result = Buffer.from(result, 'base64').toString()

        return {
            n: BigInt(result.toString().split('_')[0]),
            e: BigInt(result.toString().split('_')[1]),
        }
    }

    encode({ message, publicKey }: {message: string, publicKey: string}) {
        const { n, e } = this.decipherKey(publicKey)

        const breakMessageIntoBlocks = new BreakMessageIntoBlocks()
        const blocks = breakMessageIntoBlocks.encode(message, n)

        const modularPotentialArithmetic = new ModularPotentialArithmeticAlgorithm()

        const encodedBlocks = blocks.map(block => {
            const blockEncoded = modularPotentialArithmetic.calculate(block, e, n)
            return (blockEncoded < 0) ? (blockEncoded + n).toString() : blockEncoded.toString()
        })

        console.log("[Encryption] texto: ", message)
        console.log("[Encryption] N: ", n)
        console.log("[Encryption] texto em dígitos: ", blocks.join(''))
        console.log("[Encryption] blocos: ", blocks)
        console.log("[Encryption] E: ", e)
        console.log("[Encryption] blocos codificados: ", encodedBlocks)

        return encodedBlocks
    }
}

