export abstract class Helpers {
    static charToInt(character: string) {
        try {
            if (character.length !== 1) throw new Error("Non-char parameter")

            return parseInt(character)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    static intToChar(integer: number) {
        try {
            if (integer < 0 || integer > 9) {
                throw new Error("Non-integer parameter")
            }

            return integer.toString()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    static stringToInt(string: string) {
        try {
            if (!/\d+/.test(string)) {
                throw new Error("Parameter not be contain only number")
            }

            return parseInt(string)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    static intToString(integer: number) {
        try {
            return integer.toString()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    static charToCode(character: string, size: number) {
        try {

            return character.charCodeAt(0) + parseInt(`1${'0'.repeat(size - 1)}`)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    static codeToChar(code: number, size: number) {
        try {
            return String.fromCharCode(code - parseInt(`1${'0'.repeat(size - 1)}`))
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
