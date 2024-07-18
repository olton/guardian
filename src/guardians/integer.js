import {GuardianError} from "../error";

const GUARD_INTEGER_MESSAGE = 'VAL must be an integer'

export default (errorMessage = GUARD_INTEGER_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = Number.isInteger(input)
        if (!check) {
            return new GuardianError( msg,"integer", input )
        }
        return input
    }
}