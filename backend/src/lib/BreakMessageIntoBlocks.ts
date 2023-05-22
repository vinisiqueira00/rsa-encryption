import { Helpers } from "../helpers/global";

type ObjectValidation = {
    value: number;
    isValid: boolean;
};

class BreakMessageIntoBlocks {
    constructor() {}

    textToMessage(text: string) {
        const textSplited = text.split("");

        const helpers = new Helpers();

        const messageArray = textSplited.map((textChar) => {
            const charResult = helpers.charToCode(textChar);

            return charResult;
        });

        const message = messageArray.join("");

        return message;
    }

    buildBlock(message: string, n: number) {
        const numberUnderConstruction: ObjectValidation[] = [];
        const nextDigit: ObjectValidation[] = [];

        let index = 0;
        while (true) {
            const newNumberUnderConstruction =
                index === 0
                    ? parseInt(message[index])
                    : parseInt(
                          `${numberUnderConstruction[index - 1].value}${
                              nextDigit[index - 1].value
                          }`
                      );

            numberUnderConstruction.push({
                value: newNumberUnderConstruction,
                isValid: newNumberUnderConstruction < n,
            });

            if (!message[index + 1]) {
                nextDigit.push({
                    value: -1,
                    isValid: true,
                });

                break;
            }

            nextDigit.push({
                value: parseInt(message[index + 1]),
                isValid: parseInt(message[index + 1]) !== 0,
            });

            if (newNumberUnderConstruction >= n) {
                break;
            }

            index++;
        }

        const buildedBlock = this.getBuildedBlock(
            numberUnderConstruction,
            nextDigit
        );

        return {
            buildedBlock,
            messageWithoutBuildingBlock: message.substring(
                buildedBlock.toString().length
            ),
        };
    }

    getBuildedBlock(
        numberConstruction: ObjectValidation[],
        nextDigit: ObjectValidation[]
    ) {
        const reverseNumberConstruction = numberConstruction.slice(0).reverse();
        const reverseNextDigit = nextDigit.slice(0).reverse();

        let response = 0;

        for (let index = 0; index < reverseNextDigit.length; index++) {
            if (
                reverseNumberConstruction[index].isValid &&
                reverseNextDigit[index].isValid
            ) {
                response = reverseNumberConstruction[index].value;
                break;
            }
        }

        return response;
    }

    encode(message: string, n: number) {
        try {
            const blocks = [];
            let newMessage = message;

            while (true) {
                const result = this.buildBlock(newMessage, n);

                blocks.push(result.buildedBlock);
                newMessage = result.messageWithoutBuildingBlock;

                if (newMessage.length === 0) break;
            }

            return blocks;
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}

export { BreakMessageIntoBlocks };
