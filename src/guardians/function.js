import {GuardianError} from "../error";

const GUARD_FUNCTION_MESSAGE = 'The value must be a function'

export default (errorMessage = GUARD_FUNCTION_MESSAGE) => {
    return function (input) {
        const check = typeof input === "function"
        if (!check) {
            return new GuardianError( errorMessage,"function", input )
        }
        return input
    }
}