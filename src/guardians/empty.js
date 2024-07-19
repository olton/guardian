import {GuardianError} from "../error";

const GUARD_EMPTY_MESSAGE = 'VAL must be an empty string or array with length 0'

export default (errorMessage = GUARD_EMPTY_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/N/g, length)
        const check = (typeof input === "string" || Array.isArray(input)) && input.length === 0
        if (!check) {
            return new GuardianError( msg,"empty", input )
        }
        return input
    }
}
