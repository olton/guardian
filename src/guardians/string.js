import {GuardianError} from "../error";

const GUARD_STRING_MESSAGE = 'VAL must be a string'

export default (errorMessage = GUARD_STRING_MESSAGE) => {
    return function(val){
        if (typeof val !== "string") {
            return new GuardianError(
                errorMessage.replace(/VAL/g, val),
                "string",
                val,
            )
        }
        return val
    }
}