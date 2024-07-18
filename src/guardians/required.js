import {GuardianError} from "../error";

const GUARD_REQUIRED_MESSAGE = 'Any value required'

export default (errorMessage = GUARD_REQUIRED_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input !== "undefined" && input !== null && input
        if (!check) {
            return new GuardianError( msg,"required", input )
        }
        return input
    }
}