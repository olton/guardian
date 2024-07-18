import {GuardianError} from "../error";

const GUARD_STARTS_WITH_MESSAGE = 'VAL must starts with START_VAL'

export default (startValue, errorMessage = GUARD_STARTS_WITH_MESSAGE) => {
    return function(val){
        const msg = errorMessage.replace(/VAL/g, val).replace(/START_VAL/g, startValue)
        if (typeof val !== "string" || !val.startsWith(startValue)) {
            return new GuardianError( msg, "startsWith", val )
        }
        return val
    }
}