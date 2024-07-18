import {GuardianError} from "../error";

const GUARD_STARTS_WITH_MESSAGE = 'VAL must starts with START_VAL'

export default (startValue, errorMessage = GUARD_STARTS_WITH_MESSAGE) => {
    return function(input){
        const msg = errorMessage.replace(/VAL/g, input).replace(/START_VAL/g, startValue)
        const check = typeof input === "string" && input.startsWith(startValue)
        if (!check) {
            return new GuardianError( msg, "startsWith", input )
        }
        return input
    }
}