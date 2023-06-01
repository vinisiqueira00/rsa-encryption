import { Request, Response, Router } from "express"

import { Helpers } from "../helpers/Helpers"

import { BreakMessageIntoBlocks } from "../lib/BreakMessageIntoBlocks"
import { EratosthenesSieveAlgorithm } from "../lib/EratosthenesSieveAlgorithm"
import { EuclideanAlgorithm } from "../lib/EuclideanAlgorithm"
import { ExtendedEuclideanAlgorithm } from "../lib/ExtendedEuclideanAlgorithm"
import { FactorizationAlgorithm } from "../lib/FactorizationAlgorithm"
import { FermatAlgorithm } from "../lib/FermatAlgorithm"
import { ModularArithmeticAlgorithm } from "../lib/ModularArithmeticAlgorithm"
import { ModularDivisionArithmeticAlgorithm } from "../lib/ModularDivisionArithmeticAlgorithm"
import { ModularPotentialArithmeticAlgorithm } from "../lib/ModularPotentialArithmeticAlgorithm"

interface RequestData {
    euclideanAlgorithm: {
        firstNumber: number
        secondNumber: number
    }
    extendedEuclideanAlgorithm: {
        firstNumber: number
        secondNumber: number
    }
    factorizationAlgorithm: {
        number: number
    }
    fermatAlgorithm: {
        number: number
    }
    eratosthenesSieveAlgorithm: {
        number: number
    }
    modularArithmeticAlgorithm: {
        moduleNumber: number
        number: number
    }
    modularPotentialArithmeticAlgorithm: {
        baseNumber: number
        exponentNumber: number
        moduleNumber: number
    }
    modularDivisionArithmeticAlgorithm: {
        firstNumber: number
        secondNumber: number
        moduleNumber: number
    }
    helpersAlgorithm: {
        character: string
        string: string
        code: string
    }
    breakMessageIntoBlocksAlgorithm: {
        text: string
        n: number
    }
}

type CustomRequest = Request<{}, {}, RequestData>

export const libraryRouter = Router()

libraryRouter.get("/", (request: CustomRequest, response: Response) => {
    try {
        const body = request.body

        // Algoritmo euclidiano
        const euclideanAlgorithm = new EuclideanAlgorithm()
        const euclideanValue = euclideanAlgorithm.calculate(
            body.euclideanAlgorithm.firstNumber,
            body.euclideanAlgorithm.secondNumber,
        )

        // Algoritmo euclidiano extendido
        const extendedEuclideanAlgorithm = new ExtendedEuclideanAlgorithm()
        const extendedEuclideanValue = extendedEuclideanAlgorithm.calculate(
            body.extendedEuclideanAlgorithm.firstNumber,
            body.extendedEuclideanAlgorithm.secondNumber,
        )

        // Algoritmo de fatorização
        const factorizationAlgorithm = new FactorizationAlgorithm()
        const factorizationValue = factorizationAlgorithm.calculate(body.factorizationAlgorithm.number)

        // Algoritmo de Fermat
        const fermatAlgorithm = new FermatAlgorithm()
        const fermatValue = fermatAlgorithm.calculate(body.fermatAlgorithm.number)

        // Algoritmo crivo de Eratóstenes
        const eratosthenesSieveAlgorithm = new EratosthenesSieveAlgorithm()
        const eratosthenesSieveValue = eratosthenesSieveAlgorithm.calculate(
            body.eratosthenesSieveAlgorithm.number
        )

        // Algoritmo de aritmética modular
        const modularArithmeticAlgorithm = new ModularArithmeticAlgorithm()
        const modularArithmeticValue = modularArithmeticAlgorithm.calculate(
            body.modularArithmeticAlgorithm.moduleNumber,
            body.modularArithmeticAlgorithm.number
        )

        // Algoritmo de aritmética modular potencial
        const modularPotentialArithmeticAlgorithm = new ModularPotentialArithmeticAlgorithm()
        const modularPotentialArithmeticValue = modularPotentialArithmeticAlgorithm.calculate(
            body.modularPotentialArithmeticAlgorithm.baseNumber,
            body.modularPotentialArithmeticAlgorithm.exponentNumber,
            body.modularPotentialArithmeticAlgorithm.moduleNumber
        )

        // Algoritmo de aritmética modular de divisão
        const modularDivisionArithmeticAlgorithm = new ModularDivisionArithmeticAlgorithm()
        const modularDivisionArithmeticValue = modularDivisionArithmeticAlgorithm.calculate(
            body.modularDivisionArithmeticAlgorithm.firstNumber,
            body.modularDivisionArithmeticAlgorithm.secondNumber,
            body.modularDivisionArithmeticAlgorithm.moduleNumber
        )

        // Algoritmos de preparação
        const charToInt = Helpers.charToInt(body.helpersAlgorithm.character)
        const intToChar = Helpers.intToChar(charToInt)
        const stringToInt = Helpers.stringToInt(body.helpersAlgorithm.string)
        const intToString = Helpers.intToString(stringToInt)
        const charToCode = Helpers.charToCode(body.helpersAlgorithm.code)
        const codeToChar = Helpers.codeToChar(charToCode)
        const helpersValue = {
            charToInt,
            intToChar,
            stringToInt,
            intToString,
            charToCode,
            codeToChar,
        }

        // Algoritmo de construção de blocos
        const breakMessageIntoBlocks = new BreakMessageIntoBlocks()
        const breakMessageIntoBlocksValue = breakMessageIntoBlocks.encode(
            body.breakMessageIntoBlocksAlgorithm.text,
            body.breakMessageIntoBlocksAlgorithm.n
        )

        // Retorno da API
        return response.json({ response: {
            euclideanValue,
            extendedEuclideanValue,
            factorizationValue,
            fermatValue,
            eratosthenesSieveValue,
            modularArithmeticValue,
            modularPotentialArithmeticValue,
            modularDivisionArithmeticValue,
            helpersValue,
            breakMessageIntoBlocksValue,
        } })
    } catch (error) {
        return response.status(400).json({ error: (error as Error).message })
    }
})
