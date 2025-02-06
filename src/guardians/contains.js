import {GuardianError} from "../error/index.js";

const GUARD_STRING_MESSAGE = 'VAL must must contains OBJ'

export default (obj, errorMessage = GUARD_STRING_MESSAGE) => {
    return function (input) {
        const msg = errorMessage.replace(/VAL/g, input).replace(/OBJ/g, obj)
        const check = input.includes(obj)
        if (!check) {
            return new GuardianError( msg,"contains", input )
        }
        return input
    }
}