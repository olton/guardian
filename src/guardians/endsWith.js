import {GuardianError} from "../error";

const GUARD_ENDS_WITH_MESSAGE = 'VAL must end with END_VAL'

export default (endValue, errorMessage = GUARD_ENDS_WITH_MESSAGE) => {
    return function(val){
        const msg = errorMessage.replace(/VAL/g, val).replace(/END_VAL/g, endValue)
        if (typeof val !== "string" || !val.endsWith(endValue)) {
            return new GuardianError( msg, "endsWith", val )
        }
        return val
    }
}