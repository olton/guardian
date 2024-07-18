import {GuardianError} from "../error";

const GUARD_SAFE_INTEGER_MESSAGE = 'VAL must be an safe integer'

export default (errorMessage = GUARD_SAFE_INTEGER_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = Number.isSafeInteger(input)
        if (!check) {
            return new GuardianError( msg,"safeInteger", input )
        }
        return input
    }
}