import {GuardianError} from "../error";
import isValue from "../helpers/is-value.js";

const GUARD_STARTS_WITH_MESSAGE = 'VAL must starts with START_VAL'

export default (startValue, errorMessage = GUARD_STARTS_WITH_MESSAGE) => {
    if (!isValue(startValue)) throw new Error(`START_VALUE not defined!`)

    return function(input){
        const msg = errorMessage.replace(/VAL/g, input).replace(/START_VAL/g, startValue)
        const check = typeof input === "string" && input.startsWith(startValue)
        if (!check) {
            return new GuardianError( msg, "startsWith", input )
        }
        return input
    }
}