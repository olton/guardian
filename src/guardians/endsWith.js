import {GuardianError} from "../error";

const GUARD_ENDS_WITH_MESSAGE = 'VAL must end with END_VAL'

export default (endValue, errorMessage = GUARD_ENDS_WITH_MESSAGE) => {
    if (typeof endValue === "undefined" || endValue === null) throw new Error(`END_VALUE not defined!`)

    return function(input){
        const msg = errorMessage.replace(/VAL/g, input).replace(/END_VAL/g, endValue)
        const check = typeof input === "string" && input.endsWith(endValue)
        if (!check) {
            return new GuardianError( msg, "endsWith", input )
        }
        return input
    }
}