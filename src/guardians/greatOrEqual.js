import {GuardianError} from "../error/index.js";

const GUARD_GREAT_MESSAGE = 'VAL must be a great or equal to VALUE'

export default (val, errorMessage = GUARD_GREAT_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val)
        const check = input >= val
        if (!check) {
            return new GuardianError( msg,"greatOrEqual", input )
        }
        return input
    }
}