import {GuardianError} from "../error/index.js";

const GUARD_LESS_MESSAGE = 'VAL must be a less then VALUE'

export default (val, errorMessage = GUARD_LESS_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val)
        const check = input < val
        if (!check) {
            return new GuardianError( msg,"less", input )
        }
        return input
    }
}