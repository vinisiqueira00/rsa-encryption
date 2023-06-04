import { Helpers } from "../../helpers/Helpers"

type ObjectValidation = {
    value: bigint
    isValid: boolean
}

export class BreakMessageIntoBlocks {
    textToMessage(text: string) {
        return text.split("").map((textChar) => Helpers.charToCode(textChar)).join("")
    }

    buildBlock(message: string, n: bigint) {
        const numberUnderConstruction: ObjectValidation[] = []
        const nextDigit: ObjectValidation[] = []

        let index = 0
        while (true) {
            const newNumberUnderConstruction =
                index === 0
                    ? BigInt(message[index])
                    : BigInt(
                          `${numberUnderConstruction[index - 1].value}${
                              nextDigit[index - 1].value
                          }`
                      )

            numberUnderConstruction.push({
                value: newNumberUnderConstruction,
                isValid: newNumberUnderConstruction < n,
            })

            if (!message[index + 1]) {
                nextDigit.push({
                    value: -1n,
                    isValid: true,
                })

                break
            }

            nextDigit.push({
                value: BigInt(message[index + 1]),
                isValid: parseInt(message[index + 1]) !== 0,
            })

            if (newNumberUnderConstruction >= n) {
                break
            }

            index++
        }

        const buildedBlock = this.getBuildedBlock(
            numberUnderConstruction,
            nextDigit
        )

        return {
            buildedBlock,
            messageWithoutBuildingBlock: message.substring(
                buildedBlock.toString().length
            ),
        }
    }

    getBuildedBlock(
        numberConstruction: ObjectValidation[],
        nextDigit: ObjectValidation[]
    ) {
        const reverseNumberConstruction = numberConstruction.slice(0).reverse()
        const reverseNextDigit = nextDigit.slice(0).reverse()

        let response = 0n

        for (let index = 0; index < reverseNextDigit.length; index++) {
            if (
                reverseNumberConstruction[index].isValid &&
                reverseNextDigit[index].isValid
            ) {
                response = reverseNumberConstruction[index].value
                break
            }
        }

        return response
    }

    encode(text: string, n: bigint) {
        try {
            const message = this.textToMessage(text)

            console.log('[Encryption] message: ', message)

            const blocks = []
            let newMessage = message

            while (true) {
                const result = this.buildBlock(newMessage, n)

                blocks.push(result.buildedBlock)
                newMessage = result.messageWithoutBuildingBlock

                if (newMessage.length === 0) break
            }

            return blocks
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
