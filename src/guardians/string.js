import {GuardianError} from "../error";

const GUARD_STRING_MESSAGE = 'VAL must be a string'

export default (errorMessage = GUARD_STRING_MESSAGE) => {
    return function (val) {
        const msg = errorMessage.replace(/VAL/g, val)
        if (typeof val !== "string") {
            return new GuardianError( msg,"string", val )
        }
        return val
    }
}