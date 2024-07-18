import {GuardianError} from "../error";

const GUARD_BOOLEAN_MESSAGE = 'VAL must be a boolean'

export default (errorMessage = GUARD_BOOLEAN_MESSAGE) => {
    return function(val){
        if (typeof val !== "boolean") {
            return new GuardianError(
                errorMessage.replace(/VAL/g, val),
                "boolean",
                val,
            )
        }
        return val
    }
}