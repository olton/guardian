import {GuardianError} from "../error";
import isValue from "../helpers/is-value.js";

const GUARD_MIN_VALUE_MESSAGE = 'VAL must be a great then MIN_VALUE'

export default (minValue, errorMessage = GUARD_MIN_VALUE_MESSAGE) => {
    if (!isValue(minValue)) throw new Error(`MIN_VALUE not defined!`)

    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/MIN_VALUE/g, minValue)
        const given = +input
        const check = !isNaN(given) && given >= minValue
        if (!check) {
            return new GuardianError( msg,"minValue", input )
        }
        return input
    }
}