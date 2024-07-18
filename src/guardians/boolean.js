import {GuardianError} from "../error";

const GUARD_BOOLEAN_MESSAGE = 'VAL must be a boolean'

export default (errorMessage = GUARD_BOOLEAN_MESSAGE) => {
    return function(input){
        const msg = errorMessage.replace(/VAL/g, input)
        const check = typeof input === "boolean"
        if (!check) {
            return new GuardianError( msg, "boolean", input )
        }
        return input
    }
}