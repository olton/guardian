import {GuardianError} from "../error/index.js";

const GUARD_SIMILAR_MESSAGE = 'VAL must be a similar to VALUE'

export default (val, errorMessage = GUARD_SIMILAR_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/VALUE/g, val)
        const check = input == val
        if (!check) {
            return new GuardianError( msg,"similar", input )
        }
        return input
    }
}