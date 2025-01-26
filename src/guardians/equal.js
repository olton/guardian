import {GuardianError} from "../error/index.js";

const GUARD_EQUAL_MESSAGE = 'VAL must be an equal to VALUE'

export default (val, errorMessage = GUARD_EQUAL_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val)
        const check = input === val
        if (!check) {
            return new GuardianError( msg,"equal", input )
        }
        return input
    }
}