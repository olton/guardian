import {GuardianError} from "../error";
import string from "./string.js";

const GUARD_ARRAY_MESSAGE = 'VAL must be an array of TYPE'

export default (guard, errorMessage = GUARD_ARRAY_MESSAGE) => {
    if (!guard && !errorMessage) {
        guard = string()
        errorMessage = GUARD_ARRAY_MESSAGE
    }

    if (typeof guard === "string") {
        errorMessage = guard
        guard = string()
    }

    return function(val){
        const msg = errorMessage.replace(/VAL/g, val).replace(/TYPE/g, guard.name)

        if (!Array.isArray(val)) {
            return new GuardianError( msg, "array", val )
        }

        for (let v of val) {
            const result = guard(v)
            if (result instanceof GuardianError) {
                return new GuardianError( msg, "array", val )
            }
        }

        return val
    }
}