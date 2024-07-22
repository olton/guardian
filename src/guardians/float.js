import {GuardianError} from "../error";

const GUARD_FLOAT_MESSAGE = 'VAL must be a float'

export default (errorMessage = GUARD_FLOAT_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input)
        const check = (!isNaN(input) && +n % 1 !== 0) || /^\d*\.\d+$/.test(input)
        if (!check) {
            return new GuardianError( msg,"float", input )
        }
        return input
    }
}