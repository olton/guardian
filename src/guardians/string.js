import {GuardianError} from "../error";

const GUARD_STRING_MESSAGE = 'VAL must be a string'

export default (errorMessage = GUARD_STRING_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "string"
        if (!check) {
            return new GuardianError( msg,"string", input )
        }
        return input
    }
}