import {GuardianError} from "../error";
import isValue from "../helpers/is-value.js";

const GUARD_BETWEEN_MESSAGE = 'VAL must be between MIN_VAL and MAX_VAL';

export default (minValue, maxValue, errorMessage = GUARD_BETWEEN_MESSAGE) => {
    if (!isValue(minValue)) throw new Error(`MIN_VALUE not defined!`)
    if (!isValue(maxValue)) throw new Error(`MAX_VALUE not defined!`)

    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/MIN_VAL/g, minValue).replace(/MAX_VAL/g, maxValue)
        const given = +input
        const check = !isNaN(given) && (input >= +minValue && input <= +maxValue)
        if (!check) {
            return new GuardianError( msg,"between", input )
        }
        return input
    }
}