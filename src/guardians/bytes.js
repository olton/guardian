import {GuardianError} from "../error";

const GUARD_BYTES_MESSAGE = 'The length of string must be VAL bytes'

export default (length, errorMessage = GUARD_BYTES_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string" && new TextEncoder().encode(input).length === length
        if (!check) {
            return new GuardianError( msg,"string", input )
        }
        return input
    }
}