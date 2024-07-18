import {GuardianError} from "../error";

const GUARD_MAX_VALUE_MESSAGE = 'VAL must be a less then MAX_VALUE'

export default (maxValue, errorMessage = GUARD_MAX_VALUE_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/MAX_VALUE/g, maxValue)
        const given = +input
        const check = !isNaN(given) && given <= maxValue
        if (!check) {
            return new GuardianError( msg,"max-value", input )
        }
        return input
    }
}