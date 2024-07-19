import {GuardianError} from "../error";

const GUARD_LENGTH_MESSAGE = 'VAL must be a string or array with length N'

export const length =  (length, errorMessage = GUARD_LENGTH_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/N/g, length)
        const check = (typeof input === "string" || Array.isArray(input)) && input.length === length
        if (!check) {
            return new GuardianError( msg,"length", input )
        }
        return input
    }
}

export const minLength =  (length, errorMessage = GUARD_LENGTH_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/N/g, length)
        const check = (typeof input === "string" || Array.isArray(input)) && input.length >= length
        if (!check) {
            return new GuardianError( msg,"minLength", input )
        }
        return input
    }
}

export const maxLength =  (length, errorMessage = GUARD_LENGTH_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/N/g, length)
        const check = (typeof input === "string" || Array.isArray(input)) && input.length <= length
        if (!check) {
            return new GuardianError( msg,"maxLength", input )
        }
        return input
    }
}