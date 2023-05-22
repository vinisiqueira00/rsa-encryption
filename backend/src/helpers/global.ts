class Helpers {
    constructor() {}

    charToInt(character: string) {
        try {
            if (character.length !== 1) throw new Error("Non-char parameter");

            return parseInt(character);
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }

    intToChar(integer: number) {
        try {
            if (integer < 0 || integer > 9) {
                throw new Error("Non-integer parameter");
            }

            return integer.toString();
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }

    stringToInt(string: string) {
        try {
            if (!/\d+/.test(string)) {
                throw new Error("Parameter not be contain only number");
            }

            return parseInt(string);
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }

    intToString(integer: number) {
        try {
            return integer.toString();
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }

    charToCode(character: string) {
        try {
            return character.charCodeAt(0) + 100;
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }

    codeToChar(code: number) {
        try {
            return String.fromCharCode(code - 100);
        } catch (erro) {
            throw new Error((erro as any).message);
        }
    }
}

export { Helpers };
